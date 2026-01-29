import { fetchWithCookies } from "@/lib/api/fetchWithCookies"
import { AttentionType, Priority } from "@/app/generated/prisma";

export type AttentionWithClient = {
  id: string
  title: string
  priority: "LOW" | "MEDIUM" | "HIGH"
  dueDate: string | null
  client: {
    id: string
    name: string
    email: string | null
  }
}

type CreateAttentionInput = {
  clientId: string,
  title: string,
  description?: string,
  type: AttentionType,
  priority: Priority,
  amount?: number,
  dueDate?: Date,
}


type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
}

export async function fetchAttentionToday(): Promise<AttentionWithClient[]> {
  const res = await fetchWithCookies("/api/attentions/today")

  const json: ApiResponse<AttentionWithClient[]> = await res.json()

  if (!res.ok || !json.success) {
    throw new Error(json.error || "Failed to fetch attentions")
  }

  return json.data!
}

export async function fetchAttentionCreate(body: CreateAttentionInput) {

  const res = await fetchWithCookies('/api/attentions/create', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  const json = await res.json();

  if(!res.ok || !json.success){
    throw new Error(json.error || "Failed to create attention")
  }

}