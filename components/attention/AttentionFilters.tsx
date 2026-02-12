import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AttentionFilters as AttentionFiltersType, AttentionPriority, AttentionType } from "@/types/attention"

type AttentionFiltersProps = {
  filters: AttentionFiltersType
  onChange: (filters: Partial<AttentionFiltersType>) => void
}

export function AttentionFilters({ filters, onChange }: AttentionFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center bg-card border rounded-xl p-4 shadow-sm">

      {/* Priority */}
      <Select
        value={filters.priority}
        onValueChange={(v) =>
          onChange({ priority: v as AttentionPriority })
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="HIGH">High</SelectItem>
          <SelectItem value="MEDIUM">Medium</SelectItem>
          <SelectItem value="LOW">Low</SelectItem>
        </SelectContent>
      </Select>

      {/* Type */}
      <Select
        value={filters.type}
        onValueChange={(v) =>
          onChange({ type: v as AttentionType })
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="FOLLOW_UP">Follow up</SelectItem>
          <SelectItem value="INVOICE">Invoice</SelectItem>
          <SelectItem value="DEADLINE">Deadline</SelectItem>
        </SelectContent>
      </Select>

      {/* Due */}
      <Select
        value={filters.due}
        onValueChange={(v) =>
          onChange({ due: v as "TODAY" | "UPCOMING" | "OVERDUE" })
        }
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="Due" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="TODAY">Today</SelectItem>
          <SelectItem value="UPCOMING">Upcoming</SelectItem>
          <SelectItem value="OVERDUE">Overdue</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="secondary"
        onClick={() =>
          onChange({
            priority: undefined,
            type: undefined,
            due: undefined,
          })
        }
      >
        Reset
      </Button>
    </div>
  )
}
