import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest"
import { failedResponse, successResponse } from "@/lib/api/responses";
import { attentionService } from "@/services/attention/attention.service";
import { AttentionPriority, AttentionStatus, AttentionType } from "@/types/attention";

type Params = {
    params: Promise<{
        id: string
    }>
}

type UpdateAttentionBody = {
    title?: string
    description?: string | null
    status?: AttentionStatus
    priority?: AttentionPriority
    type?: AttentionType
    dueDate?: string | null
    amount?: number | null
}

export async function GET(_req: Request, { params }: Params) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();
        const { id } = await params

        const attention = await attentionService.getAttentionByAttentionId(id)

        return successResponse(attention, 200)
    } catch (err) {
        return failedResponse(err, 'Failed to fetch attention')
    }
}

export async function DELETE(_: Request, { params }: Params) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();
        const { id } = await params;

        await attentionService.deleteAttention(userId, id)

        return successResponse(true, 200);
    } catch (err) {
        return failedResponse(err, 'Failed to delete attention');
    }
}

export async function PATCH(req: Request, { params }: Params) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();
        const { id } = await params

        const body = (await req.json()) as UpdateAttentionBody

        //Guard : at least one field must be updated
        if (!Object.keys(body).length) {
            return failedResponse(null, 'No field to update', 400)
        }

        const updated = await attentionService.updateAttention(userId, id, body)

        return successResponse({ id: updated.id, status: updated.status, priority: updated.priority }, 200);

    } catch (err) {
        return failedResponse(err, 'Failed to update attention');
    }
}