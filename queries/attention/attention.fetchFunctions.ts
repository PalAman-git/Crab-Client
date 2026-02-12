import { fetchWithCookies } from "@/lib/api/fetchWithCookies"
import { AttentionFilters, AttentionType, AttentionPriority, AttentionListItem } from "@/types/attention";
import { AttentionWithClient } from "@/app/api/attentions/today/route";

type CreateAttentionInput = {
  clientId: string,
  title: string,
  description?: string,
  type: AttentionType,
  priority: AttentionPriority,
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

  if (!res.ok || !json.success) {
    throw new Error(json.error || "Failed to create attention")
  }

}

export async function fetchOpenAttentions(filters: AttentionFilters) {
  const params = new URLSearchParams();

  if (filters.priority) params.set('priority', filters.priority)
  if (filters.type) params.set('type', filters.type)
  if (filters.due) params.set('due', filters.due)

  const res = await fetchWithCookies(
    `/api/attentions/openAttentions?${params.toString()}`
  )

  const json : ApiResponse<AttentionListItem[]> = await res.json();

  if (!json.success) {
    throw new Error(json.error || "Failed to fetch open attentions")
  }

  return json.data
}