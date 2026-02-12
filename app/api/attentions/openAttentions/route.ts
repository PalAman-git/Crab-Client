import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { failedResponse, successResponse } from "@/lib/api/responses";
import { attentionService } from "@/services/attention/attention.service";
import { AttentionListItem, AttentionPriority, AttentionType } from "@/types/attention";

export async function GET(req: Request) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();

        const { searchParams } = new URL(req.url)

        const filters = {
            priority: searchParams.get('priority') as AttentionPriority | undefined,
            type: searchParams.get('type') as AttentionType | undefined,
            due: searchParams.get('due') as 'TODAY' | 'OVERDUE' | 'UPCOMING' | undefined,
        }

        const attentions = await attentionService.getOpenAttentions(userId, filters);

        return successResponse<AttentionListItem[]>(attentions,200);

    } catch (err) {
        return failedResponse(err,'failed to get open attentions')
    }

}