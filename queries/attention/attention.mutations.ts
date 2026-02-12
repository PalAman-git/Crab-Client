import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAttentionCreate, fetchDeleteAttention } from "./attention.fetchFunctions";
import { AttentionListItem } from "@/types/attention";


export function useCreateAttentionMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fetchAttentionCreate,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attentions'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard'] });
            queryClient.invalidateQueries({ queryKey: ["attentions", 'today'] });
        }
    })
}

export function useDeleteAttention() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetchDeleteAttention,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["attentions"],
      })

      const previous =
        queryClient.getQueryData<AttentionListItem[]>(["attentions"])

      queryClient.setQueryData<AttentionListItem[]>(
        ["attentions"],
        old => old?.filter(a => a.id !== id)
      )

      return { previous }
    },

    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["attentions"], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["attentions"],
      })
    },
  })
}
