'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchMe } from './auth.fetchFunctions'
import { PublicUser } from '@/types/user'

type MeQueryResponse = {
    user:PublicUser | null
    isAuthenticated:boolean
    isLoading:boolean
}

export function useMeQuery(){
    const { data,isLoading,isSuccess } = useQuery({
        queryKey:["me"],
        queryFn:fetchMe,
        retry:false , //important for auth
        staleTime:1000*60*5,
        refetchOnWindowFocus:false,
    })

    const response : MeQueryResponse = {
        user:data?.data?.user ?? null,
        isAuthenticated:isSuccess,
        isLoading,
    }

    return response
}