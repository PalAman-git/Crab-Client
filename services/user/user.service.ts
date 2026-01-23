import prisma from '@/lib/prisma'
import { validatePassword } from '@/lib/auth/password'
import { PublicUser } from '@/types/user'

function toPublicUser(user:{
    id:string
    name:string | null
    email:string
    createdAt:Date
}):PublicUser {
    return {
        id:user.id,
        name:user.name,
        email:user.email,
        createdAt:user.createdAt.toISOString(),
    }
}


class UserService {
    async isCorrectPassword(userId: string, password: string): Promise<Boolean> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                passwordHash: true,
            }
        })

        if (!user) return false;
        return validatePassword(password, user.passwordHash)
    }


    async getUserByEmail(email: string): Promise<PublicUser> {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            }
        });

        if (!user) throw new Error('User not found');
        return toPublicUser(user);
    }


    async getUserById(id:string):Promise<PublicUser>{
        const user = await prisma.user.findUnique({
            where:{id},
            select:{
                id:true,
                name:true,
                email:true,
                createdAt:true,
            }
        })

        if(!user) throw new Error("User Not Found");
        return toPublicUser(user);
    }
}

export const userService = new UserService();