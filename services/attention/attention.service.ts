import prisma from "@/lib/prisma"
import { AttentionFilters, AttentionListItem, AttentionOutput, AttentionStatus } from "@/types/attention"
import { startOfDay, endOfDay } from "@/utils/dateTime"
import { Prisma } from "@prisma/client"

export type AttentionWithClient =
  Prisma.AttentionGetPayload<{
    include: { client: true }
  }>

class AttentionService {

  async getTodaysAttentions(userId: string): Promise<AttentionWithClient[]> {
    const todayStart = startOfDay()
    const todayEnd = endOfDay()

    return prisma.attention.findMany({
      where: {
        userId,
        status: "OPEN",
        dueDate: {
          gte: todayStart,
          lte: todayEnd,
        },
      },
      orderBy: [
        { priority: "desc" },
        { dueDate: "asc" },
      ],
      include: {
        client: true,
      },
    })
  }

  async getOpenAttentions(userId: string, filters?: AttentionFilters): Promise<AttentionListItem[]> {
    const where: any = {
      userId,
      status: 'OPEN'
    }

    //Priority filter
    if (filters?.priority) {
      where.priority = filters.priority
    }

    //Type filter
    if (filters?.type) {
      where.type = filters.type
    }

    //Due date filters
    if (filters?.due) {
      const now = new Date();

      if (filters.due === 'TODAY') {
        const start = new Date(now)
        start.setHours(0, 0, 0, 0)

        const end = new Date(now)
        end.setHours(23, 59, 59, 999)

        where.dueDate = {
          gte: start,
          lte: end,
        }
      }

      if (filters.due === 'UPCOMING') {
        where.dueDate = {
          gt: now,
        }
      }

      if (filters.due === 'OVERDUE') {
        where.dueDate = {
          lt: now,
        }
      }
    }

    const attentions = await prisma.attention.findMany({
      where,
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' }
      ],
      select: {
        id: true,
        title: true,
        type: true,
        priority: true,
        status: true,
        dueDate: true,
        client: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    return attentions.map((a) => ({
      id: a.id,
      title: a.title,
      type: a.type,
      priority: a.priority,
      status: a.status,
      dueDate: a.dueDate ? a.dueDate.toISOString() : null,
      client: {
        id: a.client.id,
        name: a.client.name,
      },
    }))
  }

  async updateAttentionStatus(userId: string, id: string, status: AttentionStatus) {
    return prisma.attention.update({
      where: {
        id,
        userId,
      },
      data: {
        status,
        completedAt: status === 'COMPLETED' ? new Date() : null,
      }
    })
  }

  async getSnoozedAttentions(userId: string): Promise<AttentionListItem[]> {
    const attentions = await prisma.attention.findMany({
      where: {
        userId,
        status: 'SNOOZED'
      },
      orderBy: { updatedAt: 'desc' },
      select: {
        id: true,
        title: true,
        type: true,
        priority: true,
        status: true,
        dueDate: true,
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return attentions.map((a) => ({
      id: a.id,
      title: a.title,
      type: a.type,
      priority: a.priority,
      status: a.status,
      dueDate: a.dueDate ? a.dueDate.toISOString() : null,
      client: {
        id: a.client.id,
        name: a.client.name,
      },
    }))
  }

  async getCompletedAttentions(userId: string): Promise<AttentionListItem[]> {
    const attentions = await prisma.attention.findMany({
      where: {
        userId,
        status: 'COMPLETED'
      },
      orderBy: { completedAt: 'desc' },
      select: {
        id: true,
        title: true,
        type: true,
        priority: true,
        status: true,
        dueDate: true,
        client: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    return attentions.map((a) => ({
      id: a.id,
      title: a.title,
      type: a.type,
      priority: a.priority,
      status: a.status,
      dueDate: a.dueDate ? a.dueDate.toISOString() : null,

      client: {
        id: a.client.id,
        name: a.client.name,
      },
    }))
  }

  async getAttentionByAttentionId(attentionId: string): Promise<AttentionOutput | null> {
    const attention = await prisma.attention.findUnique({
      where: { id: attentionId },
      include: {
        client: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (!attention) return null;

    return {
      id: attention.id,
      title: attention.title,
      type: attention.type,
      description: attention.description,
      status: attention.status,
      priority: attention.priority,

      client: {
        id: attention.client.id,
        name: attention.client.name
      },

      dueDate: attention.dueDate,
      createdAt: attention.createdAt,
      completedAt: attention.completedAt ?? undefined,

      amount: attention.amount ?? undefined,
      currency: attention.currency ?? undefined,
      isPaid: attention.isPaid,
      paidAmount: attention.paidAmount ?? undefined,
      invoiceNo: attention.invoiceNo ?? undefined,
    };
  }
}

export const attentionService = new AttentionService()
