'use client'

import { ActionMenu } from "@/components/client/ActionMenu";
import CreateClientButton from "@/components/client/CreateClientButton";
import { useDeleteClient } from "@/queries/client/client.mutations";
import { useGetClients } from "@/queries/client/client.queries";
import { Trash2 } from "lucide-react";
import Link from "next/link";

export default function ClientsPage() {
  const { data: clients, isLoading, error } = useGetClients();
  const { mutate: deleteClient, isPending: isDeleteClientPending } = useDeleteClient();
  

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-40 text-muted-foreground">
        Loading clients…
      </div>
    );

  if (error instanceof Error)
    return (
      <div className="flex items-center justify-center h-40 text-destructive">
        Something went wrong
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Clients</h1>
          <p className="text-sm text-muted-foreground">
            Manage and view all your clients
          </p>
        </div>
        <CreateClientButton />
      </div>

      {/* Clients grid */}
      {clients && clients.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client) => (
            <li key={client.id}>
              <div
                className="
                  group block h-full rounded-xl border bg-card p-5
                  transition-all
                  hover:border-accent
                  hover:shadow-sm
                "
              >
                <div className="space-y-2 flex justify-between">
                  <div>
                    <h2 className="text-lg font-medium group-hover:text-accent-foreground">
                      {client.name}
                    </h2>

                    <p className="text-sm text-muted-foreground break-all">
                      {client.email ?? "No email provided"}
                    </p>
                  </div>
                  <ActionMenu options={[{
                    label: 'Delete',
                    icon: <Trash2 className="h-4 w-4" />,
                    onClick: () => deleteClient(client.id),
                    confirm: {
                      title: 'Delete this client?',
                      description: "This action can't be undone.This client will be permanently deleted.",
                      confirmLabel: 'Delete'
                    }
                  },
                  ]} />
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <Link href={`/clients/${client.id}`} className="text-muted-foreground">
                    View details
                  </Link>

                  <span className="
                    rounded-md bg-accent px-2.5 py-1
                    text-xs font-medium text-accent-foreground
                    group-hover:bg-accent-hover
                  ">
                    Open
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border bg-card p-10 text-center text-muted-foreground">
          No clients yet. Create your first one to get started.
        </div>
      )}
    </div>
  );
}
