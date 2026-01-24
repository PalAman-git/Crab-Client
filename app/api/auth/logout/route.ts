import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { authService } from "@/services/auth/auth.service";
import { ApiResponse } from "@/types/api";

export async function POST(){
    try{
        const cookieStore = await cookies();
        const refreshtoken = cookieStore.get("refresh_token")?.value;

        if(refreshtoken){
            await authService.logout(refreshtoken);
        }

        // Clear cookies regardless
        cookieStore.delete("access_token");
        cookieStore.delete("refresh_token");

        const response: ApiResponse<null> = {
            success:true,
            data:null
        }

        return NextResponse.json(response,{status:200});
    } catch {
        const response: ApiResponse<null> = {
            success:false,
            error:"Logout failed",
        };

        return NextResponse.json(response,{status:200});
    }
}