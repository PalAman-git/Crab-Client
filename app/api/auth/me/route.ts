import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api";
import { PublicUser } from "@/types/user";
import { userService } from "@/services/user/user.service";
import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";


export async function GET() {
    try {
        const { userId, sessionId } = await getUserIdAndSessionIdFromRequest();

        const user = await userService.getUserById(userId)

        const response: ApiResponse<{ user: PublicUser }> = {
            success: true,
            data: {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt.toISOString()
                }
            }
        }

        return NextResponse.json(response, { status: 200 });

    } catch (err) {
        console.log("[GET /api/auth/me]", err)
        return unauthorized();
    }
}


export function unauthorized() {
    const response: ApiResponse<null> = {
        success: false,
        error: "Unauthorized",
    };

    return NextResponse.json(response, { status: 401 });
}