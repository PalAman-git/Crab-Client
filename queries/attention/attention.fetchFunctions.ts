import { fetchWithCookies } from "@/lib/api/fetchWithCookies"
import { AttentionFilters, AttentionType, AttentionPriority, AttentionListItem } from "@/types/attention";

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

export async function fetchAttentionCreate(body: CreateAttentionInput) {

  const res = await fetchWithCookies('/api/attentions', {
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
    `/api/attentions?status=OPEN&${params.toString()}`
  )

  const json : ApiResponse<AttentionListItem[]> = await res.json();

  if (!json.success) {
    throw new Error(json.error || "Failed to fetch open attentions")
  }

  return json.data
}

export async function fetchCompletedAttentions(){
  const res = await fetchWithCookies('/api/attentions?status=COMPLETED');

  const json:ApiResponse<AttentionListItem[]> = await res.json();

  if(!json.success){
    throw new Error(json.error || "Failed to fetch completed attentions")
  }

  return json.data
}

export async function fetchDeleteAttention(id:string){
  const res = await fetchWithCookies(`/api/attentions/${id}`,{
    method:'DELETE',
  })

  const json:ApiResponse<boolean> = await res.json();

  if(!json.success) {
    throw new Error(json.error || 'Failed to delete attention')
  }

  return true
}

export async function completeAttention(id:string){
  const res = await fetchWithCookies(`/api/attentions/${id}/complete`,{
    method:"POST"
  })

  const json = await res.json();

  if(!json.success){
    throw new Error(json.error || 'Failed to complete attention')
  }

  return json.data!
}