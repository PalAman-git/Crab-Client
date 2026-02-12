import { useQuery } from "@tanstack/react-query"
import { fetchAttentionToday, fetchOpenAttentions } from "./attention.fetchFunctions"
import { AttentionWithClient } from "@/app/api/attentions/today/route"
import { AttentionFilters } from "@/types/attention"

type AttentionsTodayQueryResponse = {
    attentions: AttentionWithClient[] | undefined,
    isLoading:boolean
    error:Error | null
}

export function useAttentionsTodayQuery(){

    const { data, isLoading, error } = useQuery({
        queryKey: ["attentions", "today"],
        queryFn: fetchAttentionToday
    })
    
    const response: AttentionsTodayQueryResponse = {
        attentions:data,
        isLoading,
        error
    }
    
    return response
}

export function useGetOpenAttentions(filters:AttentionFilters){
    return useQuery({
        queryKey:['attentions',filters.priority ?? 'ALL',filters.type ?? 'ALL',filters.due ?? 'ALL',],
        queryFn:() => fetchOpenAttentions(filters)
    })
}