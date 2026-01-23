import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_TTL = '15m'

export interface JwtPayload{
    userId:string
    sessionId:string
}

export function signAccessToken(payload:JwtPayload){
    return jwt.sign(
        {payload},
        process.env.ACCESS_TOKEN_SECRET!,
        {expiresIn:ACCESS_TOKEN_TTL}
    )
}

export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload
  } catch {
    return null
  }
}
