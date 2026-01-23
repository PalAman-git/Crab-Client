import { NextResponse } from "next/server";
import { authService } from "@/services/auth/auth.service";
import { cookies } from "next/headers";
import { ApiResponse } from "@/types/api";
import { RefreshTokenResponse } from "@/types/auth";


export async function POST(){
    try{

        const cookieStore = await cookies();
        const oldRefreshToken = cookieStore.get("refresh_token")?.value

        if(!oldRefreshToken) throw new Error("No refresh token")

        const result = await authService.refreshToken(oldRefreshToken);

        cookieStore.set("access_token",result.access_token,{
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 15,
        })

        cookieStore.set("refresh_token",result.newRefreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'lax',
            path:'/',
            maxAge: 30 * 24 * 60 * 60,
        })

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