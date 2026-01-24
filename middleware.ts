import { NextRequest,NextResponse } from "next/server";

export function middleware (req:NextRequest){
    console.log("middleware hit.............");

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