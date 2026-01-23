import { PublicUser } from "./user"

export interface SignupInput{
    name:string
    email:string
    password:string
}

export interface SignupResponse{
    user:PublicUser
}

export interface LoginInput {
    email:string
    password:string
}

export interface LoginResponse{
    user:PublicUser
}

export interface AuthUser{
    id:string
    email:string
}

export interface RefreshTokenResponse{
    message:string
}