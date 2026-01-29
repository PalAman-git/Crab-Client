'use client'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { fetchLogin, fetchLogout } from "./auth.fetchFunctions"



export function useLoginMutation() {
  const router = useRouter();
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetchLogin,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
      router.replace('/dashboard')
    },
  })
}

export function useLogoutMutation() {
 
  const router = useRouter();
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: fetchLogout,
  
    onSuccess: () => {
      queryClient.clear();//clears the cache at browser
      router.replace('/login')
    }
  })
}