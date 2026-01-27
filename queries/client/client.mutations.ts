import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCreateClient } from "./client.fetchFunctions";


export function useCreateClientMutation(){
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn:fetchCreateClient,
        
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:["clients"]})
        }
    })
}