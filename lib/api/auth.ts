export async function fetchMe(){
    const res = await fetch('/api/auth/me',{
        credentials:"include",
    })

    if(!res.ok){
        throw new Error("Not authenticated")
    }

    return res.json()
}

