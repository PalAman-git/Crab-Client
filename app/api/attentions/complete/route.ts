import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { failedResponse, successResponse } from "@/lib/api/responses";
import { attentionService } from "@/services/attention/attention.service";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();
        const { status } = await req.json()

        const updated = await attentionService.updateAttentionStatus(userId, params.id, status)

        return successResponse(updated, 200);
    } catch (err) {
        return failedResponse(err, 'could not update attention')
    }
}