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

        let cookieStore = await cookies();
        cookieStore.set("refresh_token",result.refreshToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            path:"/",
            maxAge:30 * 24 * 60 * 60,
        })

        const response: ApiResponse<LoginResponse> = {
            success: true,
            data: {
                user: result.user,
                accessToken: result.accessToken
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