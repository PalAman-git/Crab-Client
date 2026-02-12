import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AttentionListItem } from "@/types/attention"
import Link from "next/link"
import clsx from "clsx"

export function AttentionCard({ attention }: { attention: AttentionListItem }) {
  const isOverdue =
    attention.dueDate && new Date(attention.dueDate) < new Date()

  return (
    <div className="rounded-2xl border bg-card p-5 transition hover:shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="text-base font-semibold leading-tight">
            {attention.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {attention.client.name}
          </p>
        </div>

        <Badge
          className={clsx(
            attention.priority === "HIGH" && "bg-destructive/10 text-destructive",
            attention.priority === "MEDIUM" && "bg-secondary",
          )}
          variant="outline"
        >
          {attention.priority}
        </Badge>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 mt-4">
        <Badge variant="outline">{attention.type}</Badge>

        {attention.dueDate && (
          <Badge
            variant="outline"
            className={clsx(
              isOverdue && "border-destructive text-destructive"
            )}
          >
            Due {new Date(attention.dueDate).toLocaleDateString()}
          </Badge>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">
        <Link
          href={`/attentions/${attention.id}`}
          className="text-sm text-accent hover:underline"
        >
          View details
        </Link>

        <div className="flex gap-2">
          <Button size="sm" variant="secondary">
            Pause
          </Button>
          <Button size="sm">
            Complete
          </Button>
        </div>
      </div>
    </div>
  )
}
