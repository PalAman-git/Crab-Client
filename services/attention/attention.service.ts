import prisma from "@/lib/prisma"
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
}

export const attentionService = new AttentionService()
