'use client'
import { useQuery } from "@tanstack/react-query"
import { fetchDashboard } from "./dashboard.fethFunctions"
import { DashboardResponse } from "@/app/api/dashboard/route"

export function useDashboardQuery() {
  return useQuery<DashboardResponse>({
    queryKey: ["dashboard"],
    queryFn: fetchDashboard,
    staleTime: 60_000,          // cache for 1 min
    refetchOnWindowFocus: false,
  })
}
