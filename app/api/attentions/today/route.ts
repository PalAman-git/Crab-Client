import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest"
import { attentionService } from "@/services/attention/attention.service"
import { ApiResponse } from "@/types/api"
import { NextResponse } from "next/server"
import { DashboardAttention } from "@/types/dashboard"


export type AttentionWithClient = DashboardAttention

export async function GET() {
  try {
    const { userId } = await getUserIdAndSessionIdFromRequest()

    const attentions = await attentionService.getTodaysAttentions(userId)
    const attentionsToSend: AttentionWithClient[] = attentions.map(a => ({
      id:a.id,
      title:a.title,
      priority:a.priority,
      dueDate:a.dueDate ? a.dueDate.toISOString() : null,
      amount: a.amount,
      currency:a.currency,
      client:{
        id:a.client.id,
        name:a.client.name,
      }
    }))

    const response: ApiResponse<AttentionWithClient[]> = {
      success: true,
      data: attentionsToSend,
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
