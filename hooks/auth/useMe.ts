
'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchMe } from '@/lib/api/auth'

export function useMe(){
    const query = useQuery({
        queryKey:["me"],
        queryFn:fetchMe,
        retry:false , //important for auth
    })

    return {
        user:query.data?.data?.user ?? null,
        isAuthenticated:query.isSuccess,
        isLoading:query.isLoading,
    }
}