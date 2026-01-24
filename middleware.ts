import { NextRequest,NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth/tokens";

export function middleware (req:NextRequest){
    console.log("middleware hit.............");
    const accessToken = req.cookies.get("access_token")?.value

    //Not logged in 
    if(!accessToken){
        return NextResponse.redirect(new URL('/login',req.url))
    }

    const payload = verifyAccessToken(accessToken)

    //Token invalid or expired
    if(!payload){
        return NextResponse.redirect(new URL('/login',req.url))
    }

    //Optionally attach user/session info
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set("x-user-id",payload.userId)
    requestHeaders.set("x-session-id",payload.sessionId)

    return NextResponse.next({
        request:{headers:requestHeaders}
    })
}

export const config = {
    matcher:[
        "/dashboard/:path*",
        "/api/(protected)/:path*"
    ]
}