import { userService } from "../user/user.service";
import { sessionService } from "./session.service";
import { refreshTokenService } from "./refresh-token.service";
import { tokenService } from "./token.service";


class AuthService {

    async login(email:string,password:string,meta?: {ua?: string;ip?: string}){
        
        const user = await userService.getUserByEmail(email);
        const hasCorrectPassword = await userService.hasCorrectPassword(user.id,password);

        if(!hasCorrectPassword) {
            throw new Error("Invalid credentials");
        }

        const session = await sessionService.createSession(user.id,meta);
        const refreshToken = await refreshTokenService.issueRefreshToken(session.id);
        const accessToken = tokenService.issueAccessToken(user.id,session.id);

        return {
            refreshToken,
            accessToken
        }
    }

    async signup(name:string,email:string,password:string,meta?:{ip?:string;ua?:string}){

        const isExistingUser = await userService.isUserExistsByEmail(email);
        if(isExistingUser) throw new Error("Email already registered");

        const user = await userService.createUser(name,email,password);
        const session = await sessionService.createSession(user.id,meta);
        const refreshToken = await refreshTokenService.issueRefreshToken(session.id)
        const accessToken =  tokenService.issueAccessToken(user.id,session.id);

        return {
            accessToken,
            refreshToken
        }
    }

    async refreshToken(oldRefreshToken:string){
        const newRefreshToken = await refreshTokenService.rotateRefreshToken(oldRefreshToken);
        const sessionId = await refreshTokenService.getSessionIdFromRefreshTable(oldRefreshToken);

        if(!sessionId) throw new Error("Session Id not found");

        const session = await sessionService.getSessionWithSessionId(sessionId);
        const accessToken = tokenService.issueAccessToken(session.user.id,session.id)

        return {
            accessToken,
            newRefreshToken
        }

    }

    async logout(sessionId:string){
        await sessionService.revokeSession(sessionId);
    }

    async authenticate(accessToken:string){
        const payload = tokenService.validateAccessToken(accessToken);

        if(!payload) return null;
        return userService.getUserById(payload.userId);
    }
}

export const authService = new AuthService();