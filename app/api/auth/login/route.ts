import { authService } from "@/services/auth/auth.service";
import { LoginInput } from "@/types/auth";
import { setAuthCookies } from "@/lib/auth/cookies";
import { successResponse,failedResponse } from "@/lib/api/responses";

export async function POST(req: Request) {
    try {
        const body:LoginInput = await req.json();

        const {accessToken,refreshToken} = await authService.login(body.email,body.password, {
            ip: req.headers.get('x-forwarded-for') ?? undefined,
            ua: req.headers.get('user-agent') ?? undefined,
        })

        await setAuthCookies(accessToken,refreshToken);

        return successResponse(null);

    } catch (err) {

        return failedResponse(err,"Login Failed",401);
    }
}