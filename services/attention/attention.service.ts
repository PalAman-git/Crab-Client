import prisma from "@/lib/prisma"
import { AttentionOutput } from "@/types/attention"
import { startOfDay, endOfDay } from "@/utils/dateTime"
import { Prisma } from "@prisma/client"

export type AttentionWithClient =
  Prisma.AttentionGetPayload<{
    include: { client: true }
  }>

class AttentionService {
  async getTodaysAttentions(
    userId: string
  ): Promise<AttentionWithClient[]> {
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

  async getAttentionByAttentionId(attentionId: string): Promise<AttentionOutput | null> {
    const attention = await prisma.attention.findUnique({
      where: { id: attentionId },
      include:{
        client:{
          select:{
            id:true,
            name:true
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

      client:{
        id:attention.client.id,
        name:attention.client.name
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
