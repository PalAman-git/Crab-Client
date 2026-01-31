import { AttentionType, Priority } from "@/app/generated/prisma"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"

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
  return (
    <Card className="hover:shadow-sm transition">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-medium">{attention.title}</p>
            <p className="text-sm text-muted-foreground">
              {attention.client.name}
            </p>
          </div>

          <Badge
            variant={
              attention.priority === 'HIGH'
                ? 'destructive'
                : attention.priority === 'MEDIUM'
                ? 'secondary'
                : 'outline'
            }
          >
            {attention.priority}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            {attention.type}
          </span>

          {attention.dueDate && (
            <span className="font-medium">
              Due {new Date(attention.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
