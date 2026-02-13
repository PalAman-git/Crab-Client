import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest"
import { failedResponse, successResponse } from "@/lib/api/responses"
import { attentionService } from "@/services/attention/attention.service"

type Params = {
    params: Promise<{
        id: string
    }>
}

export async function POST(_: Request, { params }: Params) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest()
        const { id } = await params

        const completed = await attentionService.completeAttention(
            userId,
            id
        )

        return successResponse(
            {
                id: completed.id,
                status: completed.status,
            },
            200
        )
    } catch (err) {
        return failedResponse(err, "Failed to complete attention")
    }
}
