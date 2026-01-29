import { authService } from "@/services/auth/auth.service";
import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { clearAuthCookies } from "@/lib/auth/cookies";
import { successResponse,failedResponse } from "@/lib/api/responses";

export async function POST(){
    try{
       
        const { sessionId } = await getUserIdAndSessionIdFromRequest();

        await authService.logout(sessionId);

        await clearAuthCookies();

        return successResponse(null);

    } catch {

        return failedResponse(null,"Logout failed",500);
    }
}