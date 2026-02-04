'use client'

import CreateClientButton from "@/components/client/CreateClientButton";
import { useGetClients } from "@/queries/client/client.queries";
import Link from "next/link";

export default function ClientsPage() {
  const { data: clients, isLoading, error } = useGetClients();

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Something went wrong</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl text-purple-600 mb-5">Clients</h1>
        <CreateClientButton />
      </div>

      <ul className="grid grid-cols-2 gap-2">
        {clients && clients.length > 0 ? (
          clients.map((client) => (
            <li key={client.id} >
              <Link href={`/clients/${client.id}`} className="p-4 font-medium bg-amber-200 rounded-xl">
                {client.name}
              </Link>
            </li>
          ))
        ) : (<p>No clients</p>)}
      </ul>
    </div>
  );
}
