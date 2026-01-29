import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { failedResponse, successResponse } from "@/lib/api/responses";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { userId } = await getUserIdAndSessionIdFromRequest();

        const body = await req.json();
        const {
            title,
            description,
            type,
            priority,
            amount,
            dueDate,
            clientId
        } = body

        if (!title || !type || !clientId) {
            return failedResponse(null, "title,type and clientId are required", 400);
        }

        const client = await prisma.client.findFirst({
            where: { id: clientId, userId }
        })

        if (!client) {
            return failedResponse(null, "Client not found", 404)
        }

        if (type === "INVOICE" && !amount) {
            return failedResponse(null, "Amount required for invoice", 400)
        }

        const attention = await prisma.attention.create({
            data: {
                title,
                description,
                type,
                priority,
                amount,
                dueDate: dueDate ? new Date(dueDate) : null,
                userId,
                clientId,
            }
        })

        return successResponse(attention, 201);

    } catch (err) {
        console.log("CREATE_ATTENTION_ERROR", err);
        return failedResponse(err, "Internal server error", 500);
    }
}