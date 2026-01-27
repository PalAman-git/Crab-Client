'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useLoginMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: { email: string; password: string }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })

      const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Login failed")
      }

      return json.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] })
    },
  })
}
