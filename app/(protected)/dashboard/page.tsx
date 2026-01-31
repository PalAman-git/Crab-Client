'use client'

import { useMeQuery } from "@/queries/auth/auth.queries"
import { useDashboardQuery } from "@/queries/dashboard/dashboard.queries"
import NewAttentionButton from "@/components/attention/NewAttentionButton"
import { AttentionCard } from "@/components/attention/AttentionCard"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardAttention } from "@/types/dashboard"

export default function DashboardPage() {
  const { user, isLoading: isUserLoading } = useMeQuery()
  const { data, isLoading, isError } = useDashboardQuery()

  if (isUserLoading || isLoading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Loading dashboard…
      </div>
    )
  }

  if (!user || isError || !data) {
    return (
      <div className="p-6 text-sm text-red-600">
        Failed to load dashboard
      </div>
    )
  }

  const { urgentAttentions, stats, revenue, recentActivity } = data

  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          Welcome {user.name}!
        </h1>
        <NewAttentionButton />
      </div>

      {/* Urgent Attentions */}
      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          Urgent Attention
        </h2>

        {urgentAttentions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing urgent 🎉
          </p>
        ) : (
          <div className="space-y-2">
            {urgentAttentions.map(attention => (
              <AttentionCard
                key={attention.id}
                attention={attention}
              />
            ))}
          </div>
        )}
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Today" value={stats.today} />
        <StatCard label="Overdue" value={stats.overdue} />
        <StatCard label="Pending" value={`₹${stats.pendingAmount}`} />
        <StatCard label="Clients" value={stats.clients} />
      </section>

      {/* Revenue + Suggestions */}
      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4 space-y-1">
            <p className="text-sm text-muted-foreground">
              Revenue (This Month)
            </p>
            <p className="text-2xl font-semibold">
              ₹{revenue.thisMonth}
            </p>
            <p className="text-sm text-muted-foreground">
              Paid ₹{revenue.paid} · Pending ₹{revenue.pending}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 space-y-2">
            <p className="text-sm font-medium">Suggestions</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {stats.overdue > 0 && <li>• Follow up on overdue items</li>}
              {stats.pendingAmount > 0 && <li>• Send invoice reminders</li>}
              <li>• Create invoices for completed work</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Recent Activity */}
      <section className="space-y-2">
        <h2 className="text-sm font-medium text-muted-foreground">
          Recent Activity
        </h2>

        <Card>
          <CardContent className="p-4 space-y-2">
            {recentActivity.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No recent activity
              </p>
            ) : (
              recentActivity.map((item, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  • {item.label}
                </p>
              ))
            )}
          </CardContent>
        </Card>
      </section>

    </div>
  )
}

/* ---------------- Small components ---------------- */

function StatCard({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <Card>
      <CardContent className="p-4 space-y-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}
