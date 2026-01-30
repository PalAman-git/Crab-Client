import { useQuery } from "@tanstack/react-query";
import { fetchSearchClient } from "./client.fetchFunctions";
import { useDebounce } from '@/hooks/useDebounce'


export function useSearchClientQuery(query:string){
    const debouncedQuery = useDebounce(query,300)

     return useQuery({
        queryKey:['clients-search',debouncedQuery],
        queryFn:() => fetchSearchClient(debouncedQuery),
        enabled:debouncedQuery.length >=2,
        staleTime:60_000,
        placeholderData:(previousData) => previousData,
    })
}