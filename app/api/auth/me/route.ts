import { PublicUser } from "@/types/user";
import { userService } from "@/services/user/user.service";
import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { successResponse,unauthorized } from "@/lib/api/responses";


export async function GET() {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();

        const user = await userService.getUserById(userId);

        return successResponse<PublicUser>({
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt.toISOString()
        })

    } catch (err) {
        return unauthorized();
    }
}


