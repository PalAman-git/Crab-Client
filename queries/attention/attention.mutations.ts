import { useMutation,useQueryClient } from "@tanstack/react-query";
import { fetchAttentionCreate } from "./attention.fetchFunctions";


export function useCreateAttentionMutation(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:fetchAttentionCreate,

        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:['attentions']});
            queryClient.invalidateQueries({queryKey:['dashboard']});
            queryClient.invalidateQueries({queryKey:["attentions",'today']});
        }
    })
}