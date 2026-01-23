import { signAccessToken,verifyAccessToken } from "@/lib/auth/tokens";
import { JwtPayload } from "@/lib/auth/tokens";

class TokenService{
    issueAccessToken({userId,sessionId}:JwtPayload){
        return signAccessToken({userId,sessionId})
    }

    validateAccessToken(token:string){
        return verifyAccessToken(token)
    }
}

export const tokenService = new TokenService();