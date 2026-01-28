'use client'

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { useCreateClientMutation } from "@/queries/client/client.mutations"

type CreateClientDialogProps = {
    open: boolean
    onClose: () => void
}

export function CreateClientDialog({ open, onClose }: CreateClientDialogProps) {
    const { mutate: createClient, isPending, error } = useCreateClientMutation()

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)

        const name = formData.get("name")?.toString().trim()
        const email = formData.get("email")?.toString().trim()

        if (!name) return

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
