// types/dashboard.ts
import { Priority } from "@/app/generated/prisma"

export type DashboardAttention = {
  id: string
  title: string
  priority: Priority
  dueDate: string | null
  amount: number | null
  currency: string | null
  client: {
    id: string
    name: string
  }
}
