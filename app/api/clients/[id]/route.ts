import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { failedResponse, successResponse } from "@/lib/api/responses";
import { clientService } from "@/services/client/client.service";

type Params = {
    params: Promise<{
        id: string
    }>
}

export async function GET(_req: Request, { params }: Params) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();
        const { id } = await params;

        const client = await clientService.getClientById(userId, id);

        if (!client) return failedResponse(null, 'Client not found', 404);

        return successResponse(client, 200);
    } catch (err) {
        return failedResponse(err, 'failed to fetch the client');
    }
}

export async function DELETE(_req: Request, { params }: Params) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();
        const { id } = await params

        const client = await clientService.deleteClient(userId, id);

        return successResponse({ id }, 200);
    } catch (err) {
        return failedResponse(err, 'failed deleting client')
    }
}