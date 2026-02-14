import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient, deleteClient } from "./client.fetchFunctions";
import { Client } from "@/types/client";


export function useCreateClientMutation() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createClient,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] })
        }
    })
}

export function useDeleteClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteClient,

        onMutate: async (id: string) => {
            await queryClient.cancelQueries({ queryKey: ['clients'] })

            const previous = queryClient.getQueryData(['clients'])

            queryClient.setQueryData<Client[]>(
                ["clients"],
                old => old?.filter(a => a.id !== id)
            )

            return { previous }
        },

        onError: (_, __, context) => {
            if (context?.previous){
                queryClient.setQueryData(['clients'],context.previous)
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['clients'] })
            queryClient.invalidateQueries({ queryKey: ['search-client'] });
        }
    })
}