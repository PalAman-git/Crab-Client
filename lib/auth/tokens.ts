import jwt,{JwtPayload} from 'jsonwebtoken'

const ACCESS_TOKEN_TTL = '15m'

export interface AccessTokenPayload extends JwtPayload{
  userId:string;
  sessionId:string;
}

export function signAccessToken(userId:string,sessionId:string){
    return jwt.sign(
        {userId,sessionId},
        process.env.ACCESS_TOKEN_SECRET!,
        {expiresIn:ACCESS_TOKEN_TTL}
    )
}

export function verifyAccessToken(token: string):AccessTokenPayload | null{
  try {
    return jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as AccessTokenPayload
  } catch {
    return null
  }
}
