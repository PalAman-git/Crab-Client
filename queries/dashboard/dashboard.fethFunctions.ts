import { fetchWithCookies } from "@/lib/api/fetchWithCookies";

export async function fetchDashboard(){
    const res = await fetchWithCookies('/api/dashboard');

    const json = await res.json();

    if(!json.success){
        throw new Error("Failed to fetch Dashboard data");
    }

    return json.data!
}