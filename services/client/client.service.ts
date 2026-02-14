import prisma from "@/lib/prisma";
import { UserClientParams, CreateClientParams } from "@/types/client";

type ClientFilters = {
    search?: string
    limit?: number
}

class ClientService {
    async getClients(userId: string, filters?: ClientFilters) {
        const take = filters?.limit && filters.limit > 0 ? Math.min(filters.limit,20) : undefined;

        return prisma.client.findMany({
            where: {
                userId,
                ...(filters?.search && {
                    name: {
                        contains: filters.search,
                        mode: 'insensitive'
                    },
                }),
            },
            orderBy: { createdAt: 'desc' },
            ...(take && {take}),
        })
    }

    async createClient(params: CreateClientParams) {
        const { name, userId, email } = params

        if (!name) {
            throw this.badRequest('client name is required')
        }

        return prisma.client.create({
            data: {
                name,
                userId,
                email,
            },
        })
    }

    async deleteClient(userId:string,clientId:string){
        return prisma.client.delete({
            where:{
                id:clientId,
                userId
            }
        })
    }

    async getClientById(userId:string,clientId: string) {
        return prisma.client.findUnique({
            where: { id: clientId,userId }
        })
    }

    async assertClientOwnership(params: UserClientParams): Promise<void> {
        const { clientId, userId } = params

        const exists = await prisma.client.count({
            where: { id: clientId, userId }
        })

        if(!exists){
            throw this.forbidden('Client does not belong to user');
        }
        
    }


    private badRequest(message:string){
        const err:any = new Error(message)
        err.status = 400
        return err
    }

    private forbidden(message:string){
        const err:any = new Error(message)
        err.status = 403
        return err
    }
}

export const clientService = new ClientService();