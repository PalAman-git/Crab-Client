import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiResponse } from "@/types/api";
import { PublicUser } from "@/types/user";
import { verifyAccessToken } from "@/lib/auth/tokens";
import { userService } from "@/services/user/user.service";


export async function GET(){
    try{
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("access_token")?.value;

        if(!accessToken){
            return unauthorized()
        }

        const payload = verifyAccessToken(accessToken);
        if(!payload) return unauthorized()

        const userId = payload.userId;
        const user = await userService.getUserById(userId)
        
        if(!user){
            return unauthorized();
        }

        const response :ApiResponse<{user:PublicUser}> = {
            success:true,
            data:{
                user:{
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    createdAt:user.createdAt.toISOString()
                }
            }
        }

        return NextResponse.json(response,{status:200});

    }catch{
        return unauthorized();
    }
}


function unauthorized() {
  const response: ApiResponse<null> = {
    success: false,
    error: "Unauthorized",
  };

  return NextResponse.json(response, { status: 401 });
}