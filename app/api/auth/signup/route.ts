import { SignupInput } from "@/types/auth";
import { authService } from "@/services/auth/auth.service";
import { setAuthCookies } from "@/lib/auth/cookies";
import { successResponse,failedResponse } from "@/lib/api/responses";


export async function POST(req:Request){
    try{
        const { name,email,password }: SignupInput = await req.json();

        const {accessToken,refreshToken} = await authService.signup(name,email,password,{
            ip:req.headers.get('x-forwarded-for') ?? undefined,
            ua:req.headers.get('user-agent') ?? undefined,
        })

        await setAuthCookies(accessToken,refreshToken);

        return successResponse(null,201);

    } catch(err){

        return failedResponse(err,"Signup failed",400);
    }
}