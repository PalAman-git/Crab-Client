import { verifyAccessToken } from "../auth/tokens"
import { getAccessToken } from "../auth/cookies"

export async function getUserIdAndSessionIdFromRequest() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const payload = verifyAccessToken(accessToken)
  if (!payload) {
    throw new Error("Unauthorized");
  }

  return {
    userId: payload.userId,
    sessionId: payload.sessionId,
  }
}
