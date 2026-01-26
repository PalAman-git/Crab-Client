import { cookies } from "next/headers"
import { verifyAccessToken } from "../auth/tokens"

export async function getUserFromRequest() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value

  if (!accessToken) {
    throw new Error("Unauthorized") 
  }

  const payload = verifyAccessToken(accessToken)
  if (!payload) {
    throw new Error("Unauthorized")
  }

  return {
    userId: payload.userId,
    sessionId: payload.sessionId,
  }
}
