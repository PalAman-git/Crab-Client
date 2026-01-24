import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { verifyAccessToken } from "@/lib/auth/tokens"

export default async function AuthLayout({
    children,
}: { children: React.ReactNode }) {

    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value

    if (accessToken) {
        try {
            verifyAccessToken(accessToken)
            redirect("/dashboard")
        } catch {
            // token invalid / expired → allow access to auth pages
        }
    }
    
    return (
        <div className="min-h-screen flex flex-col justify-around">
            {children}
        </div>
    )
}