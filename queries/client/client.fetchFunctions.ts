import { fetchWithCookies } from "@/lib/api/fetchWithCookies";

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