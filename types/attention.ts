
export type AttentionType = "INVOICE" | 'DEADLINE' | 'FOLLOW_UP'
export type Priority = "LOW" | "MEDIUM" | "HIGH"
export type AttentionStatus = 'OPEN' | "COMPLETED" | 'SNOOZED'


export interface AttentionDTO {
    id:string
    title:string
    type: AttentionType
    status: AttentionStatus
    priority: Priority
    dueDate?:string
    clientId:string
}


export type CreateAttentionInput = {
    userId:string
    clientId:string

    type:AttentionType
    title:string
    description?:string
    amount?:number
    dueDate?:Date
    priority?:Priority
}

