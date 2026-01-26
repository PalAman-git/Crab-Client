import prisma from "@/lib/prisma";

class ClientService{
    async createClient(params:{
        userId:string;
        name:string;
        email?:string;
    }){
        return prisma.client.create({
            data:{
                name:params.name,
                userId:params.userId,
                email:params.email
            }
        })
    }

    async getClientsByUserId(userId:string){
        return prisma.client.findMany({
            where:{userId},
            orderBy:{createdAt:"desc"}
        })
    }
}

export const clientService = new ClientService();