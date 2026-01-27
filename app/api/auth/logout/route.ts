import { NextResponse } from "next/server";
import { authService } from "@/services/auth/auth.service";
import { ApiResponse } from "@/types/api";
import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { clearAuthCookies } from "@/lib/auth/cookies";

export async function POST(){
    try{
       
        const { sessionId } = await getUserIdAndSessionIdFromRequest();

        console.log("sessionId ",sessionId);
        await authService.logout(sessionId)

        const response : ApiResponse<null> = {
            success:true,
            data:null
        }

        clearAuthCookies();

        return NextResponse.json(response,{status:200});
    } catch {
        const response: ApiResponse<null> = {
            success:false,
            error:"Logout failed",
        };

        return NextResponse.json(response,{status:200});
    }
}