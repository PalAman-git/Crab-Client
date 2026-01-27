import { authService } from "@/services/auth/auth.service";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api";
import { LoginInput } from "@/types/auth";
import { setAuthCookies,getAccessToken,getRefreshToken } from "@/lib/auth/cookies";

export async function POST(req: Request) {
    try {
        const body:LoginInput = await req.json();

        const {accessToken,refreshToken} = await authService.login(body.email,body.password, {
            ip: req.headers.get('x-forwarded-for') ?? undefined,
            ua: req.headers.get('user-agent') ?? undefined,
        })

       setAuthCookies(accessToken,refreshToken);
       console.log("access_token: ",await getAccessToken())
       console.log("refresh_token: ",await getRefreshToken())

        const response: ApiResponse<null> = {
            success: true,
            data:null
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