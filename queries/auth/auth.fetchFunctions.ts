import { fetchWithCookies } from "@/lib/api/fetchWithCookies";

export async function fetchMe(){
    const res = await fetchWithCookies('/api/auth/me');

    if(!res.ok){
        throw new Error("Not authenticated");
    }

    return res.json();
}

export async function fetchLogout(){
    const res = await fetchWithCookies('/api/auth/logout',{
        method:"POST",
    });

    if(!res.ok){
        throw new Error("Logout failed")
    }
}

