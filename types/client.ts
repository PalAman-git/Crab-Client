export interface ClientDTO {
    id:string
    name:string
    email?: string
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

export type SearchClientParams = {
    userId:string
    query:string
    limit?:number
}

export type QueryClientResponse = {
    id:string,
    name:string,
    email?:string | null,
}