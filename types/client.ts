export type ClientStatus = "ACTIVE" | "PAUSED" | "COMPLETED"

export interface Client {
    status: ClientStatus;
    id: string;
    email: string | null;
    name: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    totalBilled: number;
    totalPaid: number;
    lastContactedAt: Date | null;
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

export type RecentClient = {
    id:string
    name:string
}