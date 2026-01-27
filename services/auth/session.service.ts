import prisma from "@/lib/prisma";
import { refreshTokenService } from "./refresh-token.service";

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

    async getSessionWithSessionId(sessionId:string){
        const session = await prisma.session.findUnique({
            where:{id:sessionId},
            include:{user:true}
        })

        if(!session) throw new Error("Session expired")
        return session
    }

    async isSession(sessionId:string){
        const session = await prisma.session.findUnique({
            where:{id:sessionId},
        })

        if(!session || session.revokedAt) {
            throw new Error("Session revoked");
        }
    }

    async revokeSession(sessionId:string){
        await refreshTokenService.revokeRefreshTokenWithSessionId(sessionId);
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