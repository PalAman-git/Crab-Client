import { authService } from "@/services/auth/auth.service";
import { getRefreshToken, setAuthCookies } from "@/lib/auth/cookies";
import { successResponse,failedResponse } from "@/lib/api/responses";


export async function POST(){
    try{
        
        const oldRefreshToken = await getRefreshToken();

        if(!oldRefreshToken) throw new Error("No refresh token")

        const { accessToken,newRefreshToken } = await authService.refreshToken(oldRefreshToken);

        await setAuthCookies(accessToken,newRefreshToken);

        return successResponse(null);

    }catch(err){

        return failedResponse(err,"Refresh token failed",401)
    }
}