import { fetchWithCookies } from "@/lib/api/fetchWithCookies";
import { ApiResponse } from "@/types/api";
import { Client, QueryClientResponse } from "@/types/client";

type CreateClientPayload = {
    name:string,
    email?: string
}

export async function fetchCreateClient(payload:CreateClientPayload){
    
    const res = await fetchWithCookies('/api/clients/createClient',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
    })

    const json = await res.json()

    if(!res.ok || !json.success){
        throw new Error(json.error || "Failed to create client")
    }

    return json.data;
}   


export async function fetchSearchClient(query:string,limit=10){
    const res = await fetchWithCookies(`/api/clients/search?q=${encodeURIComponent(query)}&limit=${limit}`)

    const json :ApiResponse<QueryClientResponse[]> = await res.json();

    if(!json.success){
        throw new Error(json.error || "Failed to Search Client")
    }

    return json.data;
}


export async function fetchClients(){
    const res = await fetchWithCookies('/api/clients/allClients');
    const json:ApiResponse<Client[]> = await res.json();

    if(!json.success){
        throw new Error(json.error || 'Failed to get clients')
    }

    return json.data;
}