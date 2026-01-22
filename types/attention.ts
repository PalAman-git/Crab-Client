export type AttentionStatus = 'OPEN' | 'COMPLETED' | 'SNOOZED'

export type AttentionType = 'FOLLOW_UP' | 'INVOICE' | 'DEADLINE'

export type AttentionPriority = 'LOW' | 'MEDIUM' | 'HIGH'

export interface AttentionDTO {
    id:string
    title:string
    type: AttentionType
    status: AttentionStatus
    priority: AttentionPriority
    dueDate?:string
    clientId:string
}