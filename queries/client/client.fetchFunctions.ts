import { fetchWithCookies } from "@/lib/api/fetchWithCookies";
import { ApiResponse } from "@/types/api";
import { Client } from "@/types/client";

type CreateClientPayload = {
    name: string,
    email?: string
}

export async function createClient(payload: CreateClientPayload) {
    const res = await fetchWithCookies('/api/clients', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })

    const json = await res.json()

    if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to create client")
    }

    return json.data;
}


export async function searchClient(query: string, limit = 10) {
    const res = await fetchWithCookies(`/api/clients?q=${encodeURIComponent(query)}&limit=${limit}`)

    const json: ApiResponse<Client[]> = await res.json();

    if (!json.success) {
        throw new Error(json.error || "Failed to Search Client")
    }

    return json.data;
}


export async function getClients() {
    const res = await fetchWithCookies('/api/clients');
    const json: ApiResponse<Client[]> = await res.json();

    if (!json.success) {
        throw new Error(json.error || 'Failed to get clients')
    }

    return json.data;
}

export async function deleteClient(id: string) {
    const res = await fetchWithCookies(`/api/clients/${id}`, {
        method: 'DELETE'
    })

    const json: ApiResponse<{ id: string }> = await res.json();

    if (!json.success) {
        throw new Error(json.error || 'Failed to delete client')
    }

    return json.data;
}