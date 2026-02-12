import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest"
import { failedResponse, successResponse } from "@/lib/api/responses";
import { attentionService } from "@/services/attention/attention.service";

type Params = {
    params: Promise<{
        id: string
    }>
}

export async function GET(_req:Request,{params}:Params){
    try{
        const {userId} = await getUserIdAndSessionIdFromRequest();
        const _resolvedParams = await params

        const attention = await attentionService.getAttentionByAttentionId(_resolvedParams.id)

        return successResponse(attention,200)
    }catch(err){
        return failedResponse(err,'Failed to fetch attention')
    }
}

export async function DELETE(_: Request, { params }: Params) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();
        const _resolvedParams = await params;

        await attentionService.deleteAttention(userId, _resolvedParams.id)

        return successResponse(true, 200);
    } catch (err) {
        return failedResponse(err, 'Failed to delete attention');
    }
}