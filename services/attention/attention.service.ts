import prisma from "@/lib/prisma"
import { startOfDay,endOfDay } from "@/utils/dateTime"
import { CreateAttentionInput } from "@/types/attention"
import { clientService } from "../client/client.service"

class AttentionService{
    async getTodaysAttentions(userId: string) {
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

    async createAttention(input : CreateAttentionInput){
        const {userId,clientId,type,title,description,amount,dueDate,priority = "MEDIUM"} = input

        
        //ensure ownership of client to a user
        await clientService.assertClientOwnerhip({clientId,userId});

        //create attention
        return prisma.attention.create({
            data:{
                userId,
                clientId,
                type,
                title,
                description,
                amount,
                dueDate,
                priority,
                lastActionAt:new Date(),
            }
        })


    }
}

export const attentionService = new AttentionService();
    