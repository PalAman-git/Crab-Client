import { SignupInput,SignupResponse } from "@/types/auth";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api";
import { authService } from "@/services/auth/auth.service";
import { cookies } from "next/headers";


export async function POST(req:Request){
    try{
        const body:SignupInput = await req.json();

        const result = await authService.signup(body,{
            ip:req.headers.get('x-forwarded-for') ?? undefined,
            ua:req.headers.get('user-agent') ?? undefined,
        })

        let cookieStore = await cookies();
        cookieStore.set("refresh_token",result.refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            path:"/",
            maxAge:30 * 24 * 60 * 60,
        });

        const response:ApiResponse<SignupResponse> = {
            success:true,
            data:{
                user:result.user,
                accessToken:result.accessToken
            }
        }
        return NextResponse.json(response,{status:200})
    } catch(err:any){
        const response:ApiResponse<null> = {
            success:false,
            error:err.message ?? "Signup failed",
        }

        return NextResponse.json(response,{status:400});
    }
}