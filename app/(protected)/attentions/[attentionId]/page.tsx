import BackButton from "@/components/BackButton/BackButton";
import { attentionService } from "@/services/attention/attention.service";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: Promise<{ attentionId: string }>;
};

export default async function AttentionPage({ params }: Props) {
  const { attentionId } = await params;
  const attention = await attentionService.getAttentionByAttentionId(attentionId);

  if (!attention) {
    return <div className="p-10 text-muted-foreground">Attention not found</div>;
  }

  return (
    <div className="p-6 px-10 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center gap-4">
        <BackButton />

        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{attention.title}</h1>
          <div className="mt-1 flex gap-2">
            <Badge variant="secondary">{attention.status}</Badge>
            <Badge variant="outline">{attention.priority}</Badge>
            <Badge variant="outline">{attention.type}</Badge>
          </div>
        </div>
      </div>

      <Separator/>

      {/* Description */}
      {attention.description && (
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground leading-relaxed">
            {attention.description}
          </CardContent>
        </Card>
      )}

      {attention.description && <Separator/>}

      {/* Details */}
      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-6 text-sm">
          <Detail label="Client" value={attention.client.name} />
          <Detail label="Created At" value={formatDate(attention.createdAt)} />
          {attention.dueDate && (
            <Detail label="Due Date" value={formatDate(attention.dueDate)} />
          )}
          {attention.completedAt && (
            <Detail
              label="Completed At"
              value={formatDate(attention.completedAt)}
            />
          )}
        </CardContent>
      </Card>

      {attention.type === 'INVOICE' && <Separator />}
      
      {/* Financial */}
      {(attention.amount || attention.invoiceNo) && (
        <Card>
          <CardHeader>
            <CardTitle>Financial</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6 text-sm">
            {attention.amount && (
              <Detail
                label="Amount"
                value={`${attention.currency ?? ""} ${attention.amount}`}
              />
            )}
            <Detail
              label="Paid"
              value={
                attention.isPaid ? (
                  <Badge variant="outline">Paid</Badge>
                ) : (
                  <Badge variant="destructive">Unpaid</Badge>
                )
              }
            />
            {attention.paidAmount && (
              <Detail
                label="Paid Amount"
                value={`${attention.currency ?? ""} ${attention.paidAmount}`}
              />
            )}
            {attention.invoiceNo && (
              <Detail label="Invoice No" value={attention.invoiceNo} />
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

/* ---------- Helpers ---------- */

function Detail({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="text-xs uppercase text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
  }).format(new Date(date));
}
