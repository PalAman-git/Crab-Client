'use client'

import { useState } from "react"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useMeQuery } from "@/queries/auth/auth.queries"
import { useAttentionsTodayQuery } from "@/queries/attention/attention.queries"
import { useCreateClientMutation } from "@/queries/client/client.mutations"
import { LogoutButton, CreateAttentionDialog, Button } from "@/components"



export default function DashboardPage() {
  const [isCreateClientDialogOpen, setIsCreateClientDialogOpen] = useState(false)
  const [isAttentionDialogOpen, setIsAttentionDialogOpen] = useState(false);

  const { user } = useMeQuery();
  const { attentions, isLoading: isAttentionsLoading, error } = useAttentionsTodayQuery();

  if (!user) return null;

  return (

    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Welcome {user.name}!</h1>

        <Button text="+ Create Client" onOpen={() => setIsCreateClientDialogOpen(true)} />
        <Button text ="+ Create Attention" onOpen={() => setIsAttentionDialogOpen(true)} />

        <LogoutButton />

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

      <CreateClientDialog
        open={isCreateClientDialogOpen}
        onClose={() => setIsCreateClientDialogOpen(false)}
      />

      <CreateAttentionDialog 
        open={isAttentionDialogOpen} 
        onClose={() => setIsAttentionDialogOpen(false)} 
      />

    </div>
  )
}

function CreateClientDialog({ open, onClose }: { open: boolean, onClose: () => void }) {
  const { mutate: createClient, isPending, error } = useCreateClientMutation()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(e.currentTarget)

    const name = formData.get("name")?.toString().trim() as string
    const email = formData.get("email")?.toString().trim() as string | null

    if (!name) alert("Please Enter the required Field")

    createClient(
      {
        name,
        email: email || undefined,
      },
      {
        onSuccess: () => {
          form.reset()
          onClose()
        },
      }
    )
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md rounded-lg bg-white p-5">
          <DialogTitle className="text-lg font-semibold">
            Create Client
          </DialogTitle>

          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <input
              name="name"
              required
              className="w-full rounded border px-3 py-2"
              placeholder="Client name"
            />

            <input
              name="email"
              type="email"
              className="w-full rounded border px-3 py-2"
              placeholder="Email (optional)"
            />

            {error && (
              <p className="text-sm text-red-600">
                {(error as Error).message}
              </p>
            )}

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded border px-3 py-1.5 text-sm"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isPending}
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isPending ? "Creating…" : "Create"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  )
}