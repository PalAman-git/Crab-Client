import { fetchWithCookies } from "@/lib/api/fetchWithCookies"

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