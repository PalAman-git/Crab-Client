import { RecentClient } from "@/types/client"
import { useEffect, useState } from "react"

const STORAGE_KEY = 'recent_clients'
const MAX_RECENT = 6

export function useRecentClients() {
  const [recentClients, setRecentClients] = useState<RecentClient[]>([])

  // Load once on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setRecentClients(JSON.parse(stored))
    }
  }, [])

  const addRecentClient = (client: RecentClient) => {
    setRecentClients((prev) => {
      const updated = [
        client,
        ...prev.filter((c) => c.id !== client.id),
      ].slice(0, MAX_RECENT)

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  return { recentClients, addRecentClient }
}