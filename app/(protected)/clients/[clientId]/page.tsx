import { clientService } from "@/services/client/client.service";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    clientId: string;
  }>;
};

export default async function ClientPage({ params }: Props) {
  const { clientId } = await params;
  const client = await clientService.getClientByClientId(clientId);

  if (!client) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Client Details
          </h1>
          <p className="text-sm text-gray-500">
            View and manage client information
          </p>
        </div>

        {/* Status badge */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            client.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {client.status}
        </span>
      </div>

      {/* Main card */}
      <div className="bg-card rounded-xl shadow-sm border p-6 space-y-6">
        {/* Top section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-medium text-gray-900">
              {client.name}
            </h2>
            <p className="text-gray-500">{client.email}</p>
          </div>

          <div className="bg-accent/50 text-accent-foreground rounded-lg px-5 py-3 text-center">
            <p className="text-sm font-medium">Total Billed</p>
            <p className="text-2xl font-semibold">
              ₹{client.totalBilled?.toLocaleString() ?? 0}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t" />

        {/* Details grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Detail label="Client Name" value={client.name} />
          <Detail label="User ID" value={client.userId} />
          <Detail label="Email" value={client.email} />
          <Detail label="Status" value={client.status} />
        </div>
      </div>
    </div>
  );
}

/* Small reusable detail row */
function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    value && (<div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-900 break-all">
        {value}
      </p>
    </div>)
  );
}
