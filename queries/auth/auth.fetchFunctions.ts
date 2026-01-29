
import { fetchWithCookies } from "@/lib/api/fetchWithCookies";
import { LoginInput } from "@/types/auth";


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

export async function fetchLogin(input:LoginInput){
    const res = await fetchWithCookies('/api/auth/login',{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    })

    const json = await res.json()
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Login failed")
      }

      return json.data
}

