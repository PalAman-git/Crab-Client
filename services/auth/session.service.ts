import prisma from "@/lib/prisma";

class SessionService{
    async createSession(userId:string,meta?: {ip?:string;ua?:string}){
        return await prisma.session.create({
            data:{
                userId,
                expiresAt:new Date(Date.now() + 30*24*60*60*1000),
                ipAddress:meta?.ip,
                userAgent:meta?.ua,
            },
        })
    }

    async revokeSession(sessionId:string){
        return await prisma.session.update({
            where:{id:sessionId},
            data:{revokedAt:new Date()},
        })
    }

    async revokeAllSessions(userId:string){
        return await prisma.session.updateMany({
            where:{userId},
            data:{revokedAt:new Date()},
        })
    }
}

export const sessionService = new SessionService();