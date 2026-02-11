import { useMeQuery } from "@/queries/auth/auth.queries"
import { RecentClient } from "@/types/client"
import { useEffect, useState,useMemo } from "react"

const MAX_RECENT = 6

export function useRecentClients() {
  const {user:me} = useMeQuery();
  const [recentClients, setRecentClients] = useState<RecentClient[]>([])

  //per-user storage key
  const storageKey = useMemo(() => {
    if(!me?.id) return null;

    return `recent_clients:${me.id}`;
  },[me?.id]);

  // Load once on mount
  useEffect(() => {
    if(!storageKey) return;

    const stored = localStorage.getItem(storageKey)
    if (stored) {
      setRecentClients(JSON.parse(stored))
    }else{
      setRecentClients([]);
    }
  }, [storageKey]);

  const addRecentClient = (client: RecentClient) => {
    if(!storageKey) return;


    setRecentClients((prev) => {
      const updated = [
        client,
        ...prev.filter((c) => c.id !== client.id),
      ].slice(0, MAX_RECENT)

      localStorage.setItem(storageKey, JSON.stringify(updated))
      return updated
    })
  }

  const clearRecentClients = () => {
    if(!storageKey) return;

    localStorage.removeItem(storageKey);
    setRecentClients([]);
  }

  return { recentClients, addRecentClient,clearRecentClients }
}