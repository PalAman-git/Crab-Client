import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { failedResponse, successResponse } from "@/lib/api/responses";
import { AttentionListItem, AttentionPriority, AttentionStatus, AttentionType } from "@/types/attention";
import { attentionService } from "@/services/attention/attention.service";

export async function POST(req: Request) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();

        const body = await req.json();
        
        const attention = await attentionService.createAttention(userId,body);

        return successResponse(attention, 201);

    } catch (err) {
        return failedResponse(err, "Internal server error", 500);
    }
}

export async function GET(req: Request) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();
        const { searchParams } = new URL(req.url)

        const filters = {
            status:searchParams.get('status') as AttentionStatus | undefined,
            priority:searchParams.get('priority') as AttentionPriority | undefined,
            type:searchParams.get('type') as AttentionType | undefined,
            due:searchParams.get('due') as 'TODAY' | 'OVERDUE' | 'UPCOMING' | undefined,
        }

        const attentions = await attentionService.getAttentions(userId,filters)

        return successResponse<AttentionListItem[]>(attentions,200)

    } catch (err) {
        return failedResponse(err, 'failed to fetch attentions')
    }
}