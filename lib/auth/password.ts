import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export function bcryptPassword(password:string){
    return bcrypt.hash(password,SALT_ROUNDS)
}

export function validatePassword(password:string,storedPassword:string){
    return bcrypt.compare(password,storedPassword);
}