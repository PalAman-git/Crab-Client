import { AttentionType, Priority } from '@/app/generated/prisma'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getDueLabel } from '@/utils/dateTime/getDueLabel'

export function AttentionCard({
  attention,
}: {
  attention: {
    id: string
    title: string
    priority: Priority
    dueDate: string | null
    type: AttentionType
    client: {
      id: string
      name: string
      email: string | null
    }
  }
}) {
  const due = getDueLabel(attention.dueDate)

  return (
    <Card className="px-4 py-3 hover:bg-muted/40 transition">
      <div className="flex items-start justify-between gap-4">
        {/* Left */}
        <div className="min-w-0">
          <p className="truncate font-medium text-sm">
            {attention.title}
          </p>
          <p className="text-xs text-muted-foreground">
            {attention.client.name}
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 shrink-0">
          {due && (
            <span
              className={cn(
                'text-xs font-medium',
                due.tone === 'danger' && 'text-red-600',
                due.tone === 'warning' && 'text-amber-600',
                due.tone === 'muted' && 'text-muted-foreground'
              )}
            >
              {due.text}
            </span>
          )}

          {attention.priority === 'HIGH' && (
            <Badge variant="outline" className="text-xs">
              High
            </Badge>
          )}
        </div>
      </div>
    </Card>
  )
}
