'use client'

import { useState } from "react"
import { useGetOpenAttentions } from "@/queries/attention/attention.queries"
import { AttentionFilters } from "@/components/attention/AttentionFilters"
import { AttentionCard } from "@/components/attention/AttentionCardForAttentionPage"
import { AttentionFilters as AttentionFilterType } from "@/types/attention"

export default function AttentionPage() {
  const [filters, setFilters] = useState<AttentionFilterType>({})
  const { data, isLoading } = useGetOpenAttentions(filters)

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <div>
        <h1 className="text-3xl font-semibold">
          Attention
        </h1>
        <p className="text-muted-foreground mt-1">
          Things that need your focus right now
        </p>
      </div>

      <AttentionFilters
        filters={filters}
        onChange={(newFilter) =>
          setFilters((prev) => ({ ...prev, ...newFilter }))
        }
      />

      {isLoading ? (
        <p className="text-muted-foreground">Loading attentions…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {data?.length ? (
            data.map((attention) => (
              <AttentionCard key={attention.id} attention={attention} />
            ))
          ) : (
            <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
              No open attentions 🎉
            </div>
          )}
        </div>
      )}
    </div>
  )
}
