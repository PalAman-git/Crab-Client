import { cookies } from 'next/headers'

const ACCESS_COOKIE = 'access_token'
const REFRESH_COOKIE = 'refresh_token'

const baseOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
}

export async function setAuthCookies(accessToken: string,refreshToken: string) {

  const store = await cookies()

  store.set(ACCESS_COOKIE, accessToken, {
    ...baseOptions,
    maxAge: 60 * 15, // 15 min
  })

  store.set(REFRESH_COOKIE, refreshToken, {
    ...baseOptions,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
}

export async function getAccessToken() {
  return (await cookies()).get(ACCESS_COOKIE)?.value
}

export async function getRefreshToken() {
  return (await cookies()).get(REFRESH_COOKIE)?.value
}

export async function clearAuthCookies() {
  const store = await cookies()
  store.delete(ACCESS_COOKIE)
  store.delete(REFRESH_COOKIE)
}
