import { cookies } from "next/headers";
import { authService } from "@/services/auth/auth.service";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api";
import { LoginInput, LoginResponse } from "@/types/auth";

export async function POST(req: Response) {
    try {
        const body:LoginInput = await req.json();

        const result = await authService.login(body, {
            ip: req.headers.get('x-forwarded-for') ?? undefined,
            ua: req.headers.get('user-agent') ?? undefined,
        })

        const cookieStore = await cookies();
        cookieStore.set("refresh_token",result.refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            path:"/",
            maxAge:30 * 24 * 60 * 60,//30 days
        })

        cookieStore.set("access_token",result.accessToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"lax",
            path:"/",
            maxAge:60 * 15, //15 min
        })

        const response: ApiResponse<LoginResponse> = {
            success: true,
            data: {
                user: result.user,
                
            },
        }

        return NextResponse.json(response, { status: 200 })

    } catch (err: any) {
        const response: ApiResponse<null> = {
            success: false,
            error: err.message ?? "Login failed",
        }

        return NextResponse.json(response, { status: 401 });
    }
}