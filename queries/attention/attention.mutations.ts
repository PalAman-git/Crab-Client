import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeAttention, fetchAttentionCreate, fetchDeleteAttention } from "./attention.fetchFunctions";
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

export function useCompleteAttention() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: completeAttention,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['attentions', 'open'] })
      const previous = queryClient.getQueryData(["attentions", 'open'])

      queryClient.setQueryData(['attentions', 'open'], (old: any[]) => old?.filter(a => a.id !== id))

      return { previous }
    },

    onError:(_err,_id,context) => {
      queryClient.setQueryData(['attentions','open'],context?.previous)
    },

    onSuccess:() => {
      queryClient.invalidateQueries({queryKey:['attentions']})
      queryClient.invalidateQueries({queryKey:['attentions','open']});
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
      queryClient.invalidateQueries({
        queryKey:['attentions','completed']
      })
    },
  })
}
