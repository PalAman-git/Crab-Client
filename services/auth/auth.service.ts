import { userService } from "../user/user.service";
import { sessionService } from "./session.service";
import { refreshTokenService } from "./refresh-token.service";
import { tokenService } from "./token.service";
import { LoginInput,SignupInput } from "../../types/auth"


class AuthService {

    async login(input:LoginInput,meta?: {ua?: string;ip?: string}){ 
        
        const user = await userService.getUserByEmail(input.email)

        const isValid = await userService.isCorrectPassword(user.id,input.password)

        if(!isValid) {
            throw new Error("Invalid credentials")
        }

        //create session
        const session = await sessionService.createSession(user.id,meta)

        //create refresh token(stored hashed)
        const refreshToken = await refreshTokenService.issueRefreshToken(session.id)

        //create access token(JWT)
        const accessToken = tokenService.issueAccessToken({userId:user.id,sessionId:session.id});

        return {
            user,
            refreshToken,
            accessToken
        }
    }

    async signup(input:SignupInput,meta?:{ip?:string;ua?:string}){

        //check if the email already exists
        const isExistingUser = await userService.isUserExistsByEmail(input.email);

        if(isExistingUser) throw new Error("Email already registered");

        //create user
        const user = await userService.createUser(input);

        //create session
        const session = await sessionService.createSession(user.id,meta);

        //generate refresh token
        const refreshToken = await refreshTokenService.issueRefreshToken(session.id)

        //generate access token
        const accessToken =  tokenService.issueAccessToken({userId:user.id,sessionId:session.id});

        return {
            user,
            accessToken,
            refreshToken
        }
    }

    async logout(sessionId:string){
        await sessionService.revokeSession(sessionId)
    }

    async authenticate(accessToken:string){
        const payload = tokenService.validateAccessToken(accessToken)

        if(!payload) return null

        return userService.getUserById(payload.userId)
    }
}

export const authService = new AuthService();