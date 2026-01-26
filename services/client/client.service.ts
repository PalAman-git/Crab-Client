import prisma from "@/lib/prisma";
import { UserClientParams,CreateClientParams } from "@/types/client";
import { userService } from "../user/user.service";

class ClientService{
    async createClient(params:CreateClientParams){
        const {name,userId,email} = params

        const userExist = await userService.getUserById(userId);
        if(!userExist) throw new Error("User not found")

        return prisma.client.create({
            data:{
                name,
                userId,
                email
            }
        })
    }

    async getClientsByUserId(userId:string){
        return prisma.client.findMany({
            where:{userId},
            orderBy:{createdAt:"desc"}
        })
    }

    async assertClientOwnerhip(params:UserClientParams):Promise<void>{
        const {clientId,userId} = params

        const count = await prisma.client.count({
            where:{id:clientId,userId}
        })

        if(count === 0) throw new Error("Client does not belong to user")
    }
}

export const clientService = new ClientService();