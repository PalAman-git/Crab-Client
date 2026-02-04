import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { failedResponse, successResponse } from "@/lib/api/responses";
import { clientService } from "@/services/client/client.service";

export async function GET(req: Request) {

    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();
        const clients = await clientService.getClientsByUserId(userId);
        return successResponse(clients);
    } catch (err) {
        return failedResponse(err, "No clients present")
    }
}