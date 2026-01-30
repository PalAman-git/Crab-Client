import { authService } from "@/services/auth/auth.service";
import { getAccessToken, getRefreshToken, setAuthCookies } from "@/lib/auth/cookies";
import { successResponse,failedResponse } from "@/lib/api/responses";


export async function POST(){
    try{
        console.log('refresh_token api hit....');
        
        const oldRefreshToken = await getRefreshToken();

        if(!oldRefreshToken) throw new Error("No refresh token")

        const { accessToken,newRefreshToken } = await authService.refreshToken(oldRefreshToken);

        await setAuthCookies(accessToken,newRefreshToken);
        console.log("access_token",await getAccessToken());
        console.log('refresh_token',await getRefreshToken());

        return successResponse(null);

    }catch(err){

        return failedResponse(err,"Refresh token failed",401)
    }
}