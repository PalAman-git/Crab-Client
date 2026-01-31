export function getDueLabel(dueDate: string | null) {
  if (!dueDate) return null

  const due = new Date(dueDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const diff =
    (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)

  if (diff < 0) return { text: 'Overdue', tone: 'danger' }
  if (diff === 0) return { text: 'Due today', tone: 'warning' }
  if (diff === 1) return { text: 'Due tomorrow', tone: 'muted' }

  return {
    text: due.toLocaleDateString(),
    tone: 'muted',
  }
}
