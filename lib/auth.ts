import jwt from 'jsonwebtoken'

const ACCESS_TOKEN_TTL = '15m'
const REFRESH_TOKEN_TTL = '7d'

export interface JwtPayload{
    userId:string
}

export function signAccessToken(userId:string){
    return jwt.sign(
        {userId},
        process.env.ACCESS_TOKEN_SECRET!,
        {expiresIn:ACCESS_TOKEN_TTL}
    )
}

export function signRefreshToken(userId:string){
    return jwt.sign(
        {userId},
        process.env.REFRESH_TOKEN_SECRET!,
        {expiresIn:REFRESH_TOKEN_TTL}
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

export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!
    ) as JwtPayload
  } catch {
    return null
  }
}