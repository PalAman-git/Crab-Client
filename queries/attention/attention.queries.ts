import { useQuery } from "@tanstack/react-query"
import { fetchCompletedAttentions, fetchOpenAttentions } from "./attention.fetchFunctions"
import { AttentionFilters } from "@/types/attention"

export function useGetOpenAttentions(filters: AttentionFilters) {
    return useQuery({
        queryKey: [
            "attentions",
            "open",
            {
                priority: filters.priority ?? "ALL",
                type: filters.type ?? "ALL",
                due: filters.due ?? "ALL",
            },
        ],
        queryFn: () => fetchOpenAttentions(filters)
    })
}

export function useGetCompletedAttentions() {
    return useQuery({
        queryKey: ['attentions', 'completed'],
        queryFn: fetchCompletedAttentions
    })
}