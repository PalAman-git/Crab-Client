import { clientService } from "@/services/client/client.service";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    clientId: string;
  }>
};

export default async function ClientPage({ params }: Props) {
  const { clientId } = await params;
  const client = await clientService.getClientByClientId(clientId);

  if (!client) notFound();

  return (
    <div>
      <h1 className="text-4xl text-purple-600">Client Details</h1>
      <p>Client ID: {client?.id}</p>
      <p>Client Name: {client?.name}</p>
      <p>Client Email: {client?.email}</p>
      <p>Client Status: {client?.status}</p>
      <p>Client User Id: {client?.userId}</p>
      <p>Client Total Billed: {client?.totalBilled}</p>
    </div>
  );
}
