import { signAccessToken,verifyAccessToken } from "@/lib/auth/tokens";

class TokenService{
    issueAccessToken(userId:string,sessionId:string){
        return signAccessToken(userId,sessionId)
    }

    validateAccessToken(token:string){
        return verifyAccessToken(token)
    }
}

export const tokenService = new TokenService();