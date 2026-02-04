import prisma from "@/lib/prisma";
import { UserClientParams, CreateClientParams, SearchClientParams } from "@/types/client";
import { userService } from "../user/user.service";

class ClientService {
    async createClient(params: CreateClientParams) {
        const { name, userId, email } = params

        const userExist = await userService.getUserById(userId);
        if (!userExist) throw new Error("User not found")

        return prisma.client.create({
            data: {
                name,
                userId,
                email
            }
        })
    }

    async getClientsByUserId(userId: string) {
        return prisma.client.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" }
        })
    }

    async getClientByClientId(clientId:string){
        return prisma.client.findUnique({
            where:{id:clientId}
        })
    }

    async assertClientOwnerhip(params: UserClientParams): Promise<void> {
        const { clientId, userId } = params

        const count = await prisma.client.count({
            where: { id: clientId, userId }
        })

        if (count === 0) throw new Error("Client does not belong to user")
    }

    async searchClients(params: SearchClientParams) {
        const { userId, query, limit = 10 } = params

        if (!query || query.length < 2) return []

        return prisma.client.findMany({
            where: {
                userId,
                name: {
                    contains: query,
                    mode: 'insensitive',
                },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
            select: {
                id: true,
                name: true,
            }
        })
    }
}

export const clientService = new ClientService();