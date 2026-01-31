import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest"
import prisma from "@/lib/prisma"
import { Priority } from "@/app/generated/prisma"
import { successResponse } from "@/lib/api/responses"

export type DashboardResponse = {
  urgentAttentions: {
    id: string
    title: string
    priority: Priority
    dueDate: Date | null
    amount: number | null
    currency: string | null
    client: {
      id: string
      name: string
    }
  }[]

  stats: {
    today: number
    overdue: number
    open: number
    clients: number
    pendingAmount: number
  }

  revenue: {
    thisMonth: number
    paid: number
    pending: number
  }

  recentActivity: {
    label: string
    createdAt: Date
  }[]
}


export async function GET() {
  const { userId } = await getUserIdAndSessionIdFromRequest()

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [
    urgentAttentions,
    stats,
    revenueAgg,
    clientsCount,
    recentAttentions,
  ] = await Promise.all([

    // 1️⃣ Urgent attentions (top priority for dashboard)
    prisma.attention.findMany({
      where: {
        userId,
        status: "OPEN",
        OR: [
          { dueDate: { lte: now } },
          { priority: "HIGH" },
        ],
      },
      orderBy: [
        { priority: "desc" },
        { dueDate: "asc" },
      ],
      take: 5,
      select: {
        id: true,
        title: true,
        priority: true,
        dueDate: true,
        amount: true,
        currency: true,
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),

    // 2️⃣ Stats (counts + pending amount)
    prisma.attention.aggregate({
      where: {
        userId,
        status: "OPEN",
      },
      _count: {
        _all: true,
      },
      _sum: {
        amount: true,
      },
    }),

    // 3️⃣ Revenue (this month)
    prisma.attention.aggregate({
      where: {
        userId,
        type: "INVOICE",
        createdAt: {
          gte: startOfMonth,
        },
      },
      _sum: {
        amount: true,
        paidAmount: true,
      },
    }),

    // 4️⃣ Client count
    prisma.client.count({
      where: { userId },
    }),

    // 5️⃣ Recent activity (lightweight)
    prisma.attention.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: {
        title: true,
        status: true,
        createdAt: true,
      },
    }),
  ])

  const pendingAmount =
    (stats._sum.amount ?? 0) - (revenueAgg._sum.paidAmount ?? 0)

  return successResponse<DashboardResponse>({
    urgentAttentions,

    stats: {
      today: urgentAttentions.filter(
        a => a.dueDate && isSameDay(a.dueDate, now)
      ).length,
      overdue: urgentAttentions.filter(
        a => a.dueDate && a.dueDate < now
      ).length,
      open: stats._count._all,
      clients: clientsCount,
      pendingAmount,
    },

    revenue: {
      thisMonth: revenueAgg._sum.amount ?? 0,
      paid: revenueAgg._sum.paidAmount ?? 0,
      pending: pendingAmount,
    },

    recentActivity: recentAttentions.map(a => ({
      label:
        a.status === "COMPLETED"
          ? `Completed: ${a.title}`
          : `Updated: ${a.title}`,
      createdAt: a.createdAt,
    })),
  })
}

/* ---------------- utilities ---------------- */

function isSameDay(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  )
}