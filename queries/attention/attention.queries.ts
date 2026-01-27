import { useQuery } from "@tanstack/react-query"
import { fetchAttentionToday } from "./attention.fetchFunctions"
import { AttentionWithClient } from "./attention.fetchFunctions"

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