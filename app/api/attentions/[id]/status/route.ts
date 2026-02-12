import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest"
import { failedResponse, successResponse } from "@/lib/api/responses"
import { attentionService } from "@/services/attention/attention.service"
import { AttentionStatus } from "@/types/attention"

type Params = {
    params: Promise<{
        id: string
    }>
}

export async function PATCH(req: Request, { params }: Params) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest()
        const { id } = await params

        const body = await req.json()
        const status = body.status as AttentionStatus | undefined

        if (!status) {
            throw new Error("Status is required")
        }

        const updated = await attentionService.updateAttentionStatus(
            userId,
            id,
            status,
        )

        return successResponse(
            {
                id: updated.id,
                status: updated.status,
            },
            200
        )
    } catch (err) {
        return failedResponse(err, "Failed to update attention status")
    }
}
