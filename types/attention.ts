
export type AttentionType = "INVOICE" | 'DEADLINE' | 'FOLLOW_UP'
export type AttentionPriority = "LOW" | "MEDIUM" | "HIGH"
export type AttentionStatus = 'OPEN' | "COMPLETED" | 'SNOOZED'


export interface AttentionOutput {
    id: string
    title: string
    type: AttentionType
    description: string | null
    status: AttentionStatus
    priority: AttentionPriority
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

export type AttentionListItem = {
    id:string
    title:string
    type:AttentionType
    priority:AttentionPriority
    status:AttentionStatus
    dueDate:string | null //when?

    client:{
        id:string
        name:string
    }
}

export type AttentionFilters = {
    priority?:AttentionPriority
    type?:AttentionType
    due?:'TODAY' | 'UPCOMING' | 'OVERDUE'
}


export type CreateAttentionInput = {
    userId: string
    clientId: string
    type: AttentionType
    title: string
    description?: string
    amount?: number
    dueDate?: Date
    priority?: AttentionPriority
}

