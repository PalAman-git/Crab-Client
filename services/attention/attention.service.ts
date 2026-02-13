import prisma from "@/lib/prisma"
import { AttentionFilters, AttentionListItem, AttentionOutput, AttentionStatus, AttentionPriority, AttentionType } from "@/types/attention"
import { startOfDay, endOfDay } from "@/utils/dateTime"
import { Prisma } from "@prisma/client"

export type AttentionWithClient =
  Prisma.AttentionGetPayload<{
    include: { client: true }
  }>

type UpdateAttentionInput = {
  title?: string
  description?: string | null
  status?: AttentionStatus
  priority?: AttentionPriority
  type?: AttentionType
  dueDate?: string | null
  amount?: number | null
}

type CreateAttentionInput = {
  title: string
  description?: string
  type: AttentionType
  priority?: AttentionPriority
  amount?: number
  dueDate?: string
  clientId: string
}

class AttentionService {
  
  private badRequest(message: string) {
    const err: any = new Error(message)
    err.status = 400
    return err
  }

  private notFound(message:string){
    const err:any = new Error(message)
    err.status = 400
    return err
  }


  async createAttention(userId: string, input: CreateAttentionInput) {
    const {
      title,
      description,
      type,
      priority,
      amount,
      dueDate,
      clientId
    } = input

    if (!title || !type || !clientId) {
      return this.badRequest("title,type and clientId are required");
    }

    const client = await prisma.client.findFirst({
      where: { id: clientId, userId }
    })

    if (!client) {
      return this.notFound("Client not found")
    }

    if (type === "INVOICE" && !amount) {
      return this.badRequest("Amount required for invoice")
    }

    return prisma.attention.create({
      data: {
        title,
        description,
        type,
        priority,
        amount,
        dueDate: dueDate ? new Date(dueDate) : null,
        userId,
        clientId,
      }
    })
  }

  async getAttentions(userId: string, filters?: AttentionFilters): Promise<AttentionListItem[]> {
    const where: any = {
      userId,
    }

    //Status filter (default OPEN)
    if (filters?.status) {
      where.status = filters.status
    } else {
      where.status = 'OPEN'
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
        { dueDate: 'asc' },
        { completedAt: 'desc' }
      ],
      select: {
        id: true,
        title: true,
        type: true,
        priority: true,
        status: true,
        dueDate: true,
        completedAt: true,
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
      completedAt: a.completedAt ? a.completedAt?.toISOString() : null,
      dueDate: a.dueDate ? a.dueDate.toISOString() : null,
      client: {
        id: a.client.id,
        name: a.client.name,
      },
    }))
  }

  async updateAttention(userId: string, attentionId: string, input: UpdateAttentionInput) {
    const existing = await prisma.attention.findFirst({
      where: {
        id: attentionId,
        userId
      }
    })

    if (!existing) {
      throw new Error('Attention not found');
    }

    const data: any = {}

    if (input.title !== undefined) data.title = input.title
    if (input.description !== undefined) data.description = input.description
    if (input.status !== undefined) data.status = input.status
    if (input.priority !== undefined) data.priority = input.priority
    if (input.type !== undefined) data.type = input.type
    if (input.amount !== undefined) data.amount = input.amount

    if (input.dueDate !== undefined) {
      data.dueDate = input.dueDate ? new Date(input.dueDate) : null
    }

    if (data.type === "INVOICE" && data.amount == null) {
      throw new Error("Invoice attention requires amount");
    }

    return prisma.attention.update({
      where: { id: attentionId },
      data,
    })
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

  async deleteAttention(userId: string, attentionId: string) {
    return prisma.attention.delete({
      where: {
        id: attentionId,
        userId
      }
    })
  }

  async completeAttention(userId: string, attentionId: string) {
    const attention = await prisma.attention.findFirst({
      where: { id: attentionId, userId },
    })

    if (!attention) {
      throw new Error('Attention not found')
    }

    if (attention.status === 'COMPLETED') {
      return attention
    }

    return prisma.attention.update({
      where: { id: attentionId },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      }
    })
  }

}

export const attentionService = new AttentionService()
