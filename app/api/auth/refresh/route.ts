import { NextResponse } from "next/server";
import { authService } from "@/services/auth/auth.service";
import { cookies } from "next/headers";
import { ApiResponse } from "@/types/api";
import { RefreshTokenResponse } from "@/types/auth";
import { setAuthCookies } from "@/lib/auth/cookies";


export async function POST(){
    try{

        const cookieStore = await cookies();
        const oldRefreshToken = cookieStore.get("refresh_token")?.value

        if(!oldRefreshToken) throw new Error("No refresh token")

        const { accessToken,newRefreshToken } = await authService.refreshToken(oldRefreshToken);

        setAuthCookies(accessToken,newRefreshToken);

        const response:ApiResponse<RefreshTokenResponse> = {
            success:true,
            data:{
                message:"access token reissued and refresh token updated successfully"
            }
        }

        return NextResponse.json(response,{status:200});

    }catch(err:any){
        const response:ApiResponse<null> = {
            success:false,
            error:err.message ?? "Refresh Token failed"
        }
        return NextResponse.json(response,{status:401});
    }
}