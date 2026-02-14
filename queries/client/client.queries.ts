import { useQuery } from "@tanstack/react-query";
import { searchClient,getClients } from "./client.fetchFunctions";

export function useSearchClientQuery(query:string){
     return useQuery({
        queryKey:['search-client',query],
        queryFn:() => searchClient(query),
        enabled:query.length >=2,
        staleTime:60_000,
        placeholderData:(previousData) => previousData,
    })
}

export function useGetClients(){
    return useQuery({
        queryKey:['clients'],
        queryFn:() => getClients(),
    })
}