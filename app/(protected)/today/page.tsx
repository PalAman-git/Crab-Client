'use client'

import { useAttentionsTodayQuery } from '@/queries/attention/attention.queries';
import { AttentionCard } from '@/components/attention/AttentionCard';

const page = () => {
    const { attentions, isLoading: isAttentionsLoading, error } = useAttentionsTodayQuery();
  return (
    <>
        {/* Attentions */}
      <div className="rounded-lg border bg-white p-4">
        <h2 className="mb-4 text-lg font-medium">Today’s Attentions</h2>

        {isAttentionsLoading && <p className="text-sm text-gray-500">Loading…</p>}

        {error && (
          <p className="text-sm text-red-600">
            {(error as Error).message}
          </p>
        )}

        {!isAttentionsLoading && attentions?.length === 0 && (
          <p className="text-sm text-gray-500">
            No attentions due today 🎉
          </p>
        )}

        {attentions && attentions.length > 0 && (
          attentions.map((a) => (
            <AttentionCard key={a.id} attention={a} />
          )

          )
        )}
      </div>
    </>
  )
}

export default page