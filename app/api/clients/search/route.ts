import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { successResponse } from "@/lib/api/responses";
import prisma from "@/lib/prisma";
import { QueryClientResponse } from "@/types/client";

export async function GET(req: Request) {
    const { userId } = await getUserIdAndSessionIdFromRequest();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || ""
    const limit = Number(searchParams.get("limit") ?? 10)

    if(q.trim().length < 2){
        return successResponse([],200)
    }

    const clients = await prisma.client.findMany({
        where:{
            userId,
            OR:[
                {name:{contains:q,mode:'insensitive'}},
                {email:{contains:q,mode:'insensitive'}}
            ]
        },

        take:Math.min(limit,20),
        select:{
            id:true,
            name:true,
            email:true,
        }
    })

    return successResponse<QueryClientResponse[]>(clients,200);
}