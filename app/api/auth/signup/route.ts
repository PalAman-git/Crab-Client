import { SignupInput } from "@/types/auth";
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

        const cookieStore = await cookies();
        
        cookieStore.set("refresh_token",result.refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            path:"/",
            maxAge:30 * 24 * 60 * 60,//30 days
        });

        cookieStore.set("access_token",result.accessToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            path:"/",
            maxAge:60 * 15,//15 min
        });

        const response:ApiResponse<null> = {
            success:true,
            data:null
        }
        return NextResponse.json(response,{status:201})
        
    } catch(err:any){
        const response:ApiResponse<null> = {
            success:false,
            error:err.message ?? "Signup failed",
        }

        return NextResponse.json(response,{status:400});
    }
}