import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest"
import { attentionService } from "@/services/attention/attention.service"
import { ApiResponse } from "@/types/api"
import { NextResponse } from "next/server"
import { Prisma } from "@/app/generated/prisma"

type AttentionWithClient = Prisma.AttentionGetPayload<{
  include: { client: true }
}>

export async function GET() {
  try {
    const { userId } = await getUserIdAndSessionIdFromRequest()

    const attentions = await attentionService.getTodaysAttentions(userId)

    const response: ApiResponse<AttentionWithClient[]> = {
      success: true,
      data: attentions,
    }

    return NextResponse.json(response, { status: 200 })

  } catch (err: any) {
    const isAuthError = err.message === "Unauthorized"

    const response: ApiResponse<null> = {
      success: false,
      error: err.message ?? "Something went wrong",
    }

    return NextResponse.json(response, {
      status: isAuthError ? 401 : 500,
    })
  }
}
