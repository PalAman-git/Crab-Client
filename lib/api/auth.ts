import { apiFetch } from "./fetcher"

export async function fetchMe(){
    const res = await apiFetch('/api/auth/me');

    if(!res.ok){
        throw new Error("Not authenticated");
    }

    return res.json();
}

