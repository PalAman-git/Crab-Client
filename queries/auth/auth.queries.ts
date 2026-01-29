'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchMe } from './auth.fetchFunctions'

export function useMeQuery(){
    const { data,isLoading,isSuccess } = useQuery({
        queryKey:["me"],
        queryFn:fetchMe,
        retry:false , //important for auth
        staleTime:1000*60*5,
        refetchOnWindowFocus:false,
    })

    return {
        user:data?.data ?? null,
        isAuthenticated:isSuccess,
        isLoading,
    }
}