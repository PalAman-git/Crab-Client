
export type AttentionType = "INVOICE" | 'DEADLINE' | 'FOLLOW_UP'
export type Priority = "LOW" | "MEDIUM" | "HIGH"
export type AttentionStatus = 'OPEN' | "COMPLETED" | 'SNOOZED'


export interface AttentionOutput {
    id: string
    title: string
    type: AttentionType
    description: string | null
    status: AttentionStatus
    priority: Priority
    dueDate: Date | null

    client: {
        id: string;
        name: string;
    }

    amount?: number
    currency?: string
    isPaid?: boolean
    paidAmount?: number
    invoiceNo?: string
    completedAt?: Date
    createdAt: Date
}


export type CreateAttentionInput = {
    userId: string
    clientId: string
    type: AttentionType
    title: string
    description?: string
    amount?: number
    dueDate?: Date
    priority?: Priority
}

