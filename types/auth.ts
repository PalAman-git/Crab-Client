import { PublicUser } from "./user"

export interface SignupInput{
    name:string
    email:string
    password:string
}

export interface LoginInput {
    email:string
    password:string
}

export interface LoginResponse{
    user:PublicUser
    accessToken:string
}

export interface AuthUser{
    id:string
    email:string
}