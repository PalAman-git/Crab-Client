import { userService } from "../user/user.service";
import { sessionService } from "./session.service";
import { refreshTokenService } from "./refresh-token.service";
import { tokenService } from "./token.service";


class AuthService {

    async login(email:string,password:string,meta?: {ua?: string;ip?: string}){ 
        const user = await userService.getUserByEmail(email);
        const hasCorrectPassword = await userService.hasCorrectPassword(user.id,password);

        if(!hasCorrectPassword) {
            throw new Error("Invalid credentials")
        }

        //create session
        const session = await sessionService.createSession(user.id,meta)

        //create refresh token(stored hashed)
        const refreshToken = await refreshTokenService.issueRefreshToken(session.id)

        //create access token(JWT)
        const accessToken = tokenService.issueAccessToken(user.id,session.id);

        return {
            user,
            refreshToken,
            accessToken
        }
    }

    async signup(name:string,email:string,password:string,meta?:{ip?:string;ua?:string}){

        //check if the email already exists
        const isExistingUser = await userService.isUserExistsByEmail(email);

        if(isExistingUser) throw new Error("Email already registered");

        //create user
        const user = await userService.createUser(name,email,password);

        //create session
        const session = await sessionService.createSession(user.id,meta);

        //generate refresh token
        const refreshToken = await refreshTokenService.issueRefreshToken(session.id)

        //generate access token
        const accessToken =  tokenService.issueAccessToken(user.id,session.id);

        return {
            user,
            accessToken,
            refreshToken
        }
    }

    async refreshToken(oldRefreshToken:string){
        const newRefreshToken = await refreshTokenService.rotateRefreshToken(oldRefreshToken);
        const sessionId = await refreshTokenService.getSessionIdFromRefreshTable(oldRefreshToken);

        if(!sessionId) throw new Error("Session Id not found");

        const session = await sessionService.getSessionWithSessionId(sessionId);

        const access_token = tokenService.issueAccessToken(session.user.id,session.id)

        return {
            access_token,
            newRefreshToken
        }

    }

    async logout(refreshToken:string){
        await refreshTokenService.revokeByToken(refreshToken);
    }

    async authenticate(accessToken:string){
        const payload = tokenService.validateAccessToken(accessToken)

        if(!payload) return null

        return userService.getUserById(payload.userId)
    }
}

export const authService = new AuthService();