import { NextRequest,NextResponse } from "next/server";

export async function proxy (req:NextRequest){
    console.log("proxy hit.............");

    const accessToken = req.cookies.get("access_token")?.value
    
    //Not logged in 
    if(!accessToken){
        return NextResponse.redirect(new URL('/login',req.url))
    }
    
    return NextResponse.next()
}

export const config = {
    matcher:[
        "/dashboard/:path*",
        "/api/(protected)/:path*"
    ]
}