import { AttentionType,Priority,AttentionStatus } from "@prisma/client"


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

