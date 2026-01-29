'use client'

import { useState } from "react"
import { useMeQuery } from "@/queries/auth/auth.queries"
import { useAttentionsTodayQuery } from "@/queries/attention/attention.queries"
import { Button } from "@/components/ui/button"
import { useLogoutMutation } from "@/queries/auth/auth.mutations"
import { AttentionDialog } from "@/components/attention/AttentionDialogBox"



export default function DashboardPage() {
  const [isAttentionDialogOpen, setIsAttentionDialogOpen] = useState(false);

  const { user } = useMeQuery();
  const { attentions, isLoading: isAttentionsLoading, error } = useAttentionsTodayQuery();
  const { mutate:logout,isPending:isLogoutPending,error:LogoutError } = useLogoutMutation();

  if (!user) return null;

  return (

    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Welcome {user.name}!</h1>

        <Button  onClick={() => setIsAttentionDialogOpen(true)} > Create Attention </Button>
        <Button onClick={() => logout()}> {isLogoutPending ? "Logging out ..." : "Log out"}</Button>

      </div>

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
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Client</th>
                <th className="px-3 py-2">Priority</th>
                <th className="px-3 py-2">Due</th>
              </tr>
            </thead>
            <tbody>
              {attentions.map((a) => (
                <tr key={a.id} className="border-b last:border-0">
                  <td className="px-3 py-2">{a.title}</td>
                  <td className="px-3 py-2">{a.client.name}</td>
                  <td className="px-3 py-2">{a.priority}</td>
                  <td className="px-3 py-2">
                    {a.dueDate
                      ? new Date(a.dueDate).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

        <AttentionDialog open={isAttentionDialogOpen} onOpenChange={setIsAttentionDialogOpen} />
    </div>
  )
}

