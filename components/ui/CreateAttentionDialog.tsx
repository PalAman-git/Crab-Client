'use client'

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useState } from "react"
import { AttentionType } from "@/app/generated/prisma"
import { Priority } from "@/app/generated/prisma"

type Props = {
    open:boolean
    onClose: () => void
}

const CreateAttentionDialog = ({open,onClose}: Props) => {

  const [title, setTitle] = useState("")
  const [type, setType] = useState<AttentionType>("FOLLOW_UP")
  const [priority, setPriority] = useState<Priority>("MEDIUM")
  const [dueDate, setDueDate] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")

  // TEMP — replace with real client select later
  const [clientId, setClientId] = useState("")

  function handleSubmit() {
    if (!clientId || !title) {
      alert("Client and title are required")
      return
    }

    const payload = {
      clientId,
      title,
      type,
      priority,
      dueDate: dueDate || undefined,
      amount: type === "INVOICE" ? Number(amount) : undefined,
      description: description || undefined,
    }

    console.log("Create attention payload:", payload)

    // TODO:
    // useCreateAttentionMutation().mutate(payload)

    onClose()
  }

  return (
    <>

      <Dialog open={open} onClose={onClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-lg bg-white p-6 space-y-4">
            <DialogTitle className="text-lg font-semibold">
              Create Attention
            </DialogTitle>

            {/* Client */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Client *
              </label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full rounded border px-3 py-2"
              >
                <option value="">Select client</option>
                {/* Replace with real data */}
                <option value="1">Client A</option>
                <option value="2">Client B</option>
              </select>
              <button
                type="button"
                className="mt-1 text-sm text-blue-600 hover:underline"
              >
                + Create new client
              </button>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Title *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded border px-3 py-2"
                placeholder="Follow up on proposal"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Type
              </label>
              <div className="flex gap-2">
                {["FOLLOW_UP", "INVOICE", "DEADLINE"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t as AttentionType)}
                    className={`rounded px-3 py-1.5 text-sm border ${
                      type === t
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    }`}
                  >
                    {t.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional fields */}
            {type === "INVOICE" && (
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Amount *
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full rounded border px-3 py-2"
                    placeholder="5000"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Due date
                  </label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full rounded border px-3 py-2"
                  />
                </div>
              </div>
            )}

            {type !== "INVOICE" && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  Due date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full rounded border px-3 py-2"
                />
              </div>
            )}

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Priority
              </label>
              <div className="flex gap-2">
                {["LOW", "MEDIUM", "HIGH"].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p as Priority)}
                    className={`rounded px-3 py-1.5 text-sm border ${
                      priority === p
                        ? "bg-gray-900 text-white"
                        : "bg-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded border px-3 py-2"
                rows={3}
                placeholder="Optional notes..."
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={onClose}
                className="rounded border px-3 py-1.5 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="rounded bg-blue-600 px-3 py-1.5 text-sm text-white"
              >
                Create Attention
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}

export default CreateAttentionDialog
