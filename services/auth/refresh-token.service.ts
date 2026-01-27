import prisma from '@/lib/prisma'
import {generateRefreshToken} from '@/lib/auth/refresh-token'
import {hashToken} from '@/lib/auth/hash'

class RefreshTokenService {
    async issueRefreshToken(sessionId:string){
        const token = generateRefreshToken()
        const hashed = hashToken(token)

        await prisma.refreshToken.create({
            data:{
                sessionId,
                hashedToken:hashed,
            }
        })
        return token
    }


    async rotateRefreshToken(oldToken:string){
        const hashedToken = hashToken(oldToken)

        const storedRefreshToken = await prisma.refreshToken.findUnique({
            where:{hashedToken:hashedToken},
            include:{session:true},//how it acts as a JOIN?
        })

        if(!storedRefreshToken || storedRefreshToken.revokedAt || storedRefreshToken.session.revokedAt){
            throw new Error("Invalid session") //what is the between catch and throw?
        }

        await prisma.refreshToken.update({
            where:{id:storedRefreshToken.id},
            data:{revokedAt: new Date()},
        })

        return this.issueRefreshToken(storedRefreshToken.sessionId)
    }

    async getSessionIdFromRefreshTable(oldToken:string){
        const hashedToken = hashToken(oldToken);

        const storedRefreshToken = await prisma.refreshToken.findUnique({
            where:{hashedToken},
            include:{session:true}
        })

        return storedRefreshToken?.sessionId
    }

    async revokeByToken(token:string){
        const hashed = hashToken(token);

        await prisma.refreshToken.updateMany({
            where:{
                hashedToken:hashed,
                revokedAt:null,
            },
            data:{
                revokedAt:new Date(),
            }
        });
    }

    async revokeRefreshTokenWithSessionId(sessionId:string){
        await prisma.refreshToken.updateMany({
            where:{sessionId,revokedAt:null},
            data:{
                revokedAt:new Date(),
            }
        })
    }
}

export const refreshTokenService = new RefreshTokenService();