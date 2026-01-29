export async function fetchWithCookies(url:string,options?:RequestInit){
    let res = await fetch(url,{
        ...options,
        credentials:"include"
    })

    if(res.status === 401){
        const refreshRes = await fetch('/api/auth/refresh',{
            method:"POST",
            credentials:"include"
        })

        if(!refreshRes.ok){
            throw new Error("Session expired");
        }

        //Retry original request
        res = await fetch(url,{
            ...options,
            credentials:"include",
        })
    }

    return res;
}