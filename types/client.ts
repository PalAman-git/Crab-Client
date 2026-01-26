export interface ClientDTO {
    id:string
    name:string
    email?: string
    company?:string
    createdAt:string
}

export type CreateClientParams = {
    userId:string
    name:string
    email?:string
}

export type UserClientParams = {
    userId:string
    clientId:string
}