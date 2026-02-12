import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AttentionListItem } from "@/types/attention"
import Link from "next/link"
import clsx from "clsx"
import { MoreVertical, Trash2 } from "lucide-react"
import { useDeleteAttention } from "@/queries/attention/attention.mutations"

export function AttentionCard({ attention }: { attention: AttentionListItem }) {
  const isOverdue = attention.dueDate && new Date(attention.dueDate) < new Date()
  const { mutate:deleteAttention } = useDeleteAttention();

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

        <div className="flex items-center gap-2">
          <Badge
            className={clsx(
              attention.priority === "HIGH" &&
                "bg-destructive/10 text-destructive",
              attention.priority === "MEDIUM" && "bg-secondary"
            )}
            variant="outline"
          >
            {attention.priority}
          </Badge>

          {/* Actions menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Delete this attention?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. The attention will be
                      permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteAttention(attention.id)} className="bg-destructive hover:bg-destructive/90">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
          <Button size="sm" className="bg-accent/90 text-foreground font-medium hover:bg-accent-hover">
            Complete
          </Button>
        </div>
      </div>
    </div>
  )
}
