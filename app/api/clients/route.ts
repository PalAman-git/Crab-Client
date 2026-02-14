import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest"
import { failedResponse, successResponse } from "@/lib/api/responses"
import { clientService } from "@/services/client/client.service"

export async function GET(req: Request) {
  try {
    const { userId } = await getUserIdAndSessionIdFromRequest()
    const { searchParams } = new URL(req.url)

    const q = searchParams.get("q")?.trim()
    const limitParam = Number(searchParams.get("limit"))

    const limit =
      Number.isFinite(limitParam) && limitParam > 0
        ? Math.min(limitParam, 20)
        : undefined

    const clients = await clientService.getClients(userId, {
      ...(q && { search: q }),
      ...(limit && { limit }),
    })

    return successResponse(clients, 200)
  } catch (err) {
    return failedResponse(err, "failed to fetch clients")
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await getUserIdAndSessionIdFromRequest()
    const body = await req.json()

    if (!body?.name?.trim()) {
      return failedResponse(null, "Client name is required", 400)
    }

    const client = await clientService.createClient({
      userId,
      name: body.name.trim(),
      email: body.email?.trim(),
    })

    return successResponse(client, 201)
  } catch (err) {
    return failedResponse(err, "failed to create client", 500)
  }
}
