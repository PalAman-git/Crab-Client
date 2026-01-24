import prisma from '@/lib/prisma'
import { bcryptPassword, validatePassword } from '@/lib/auth/password'
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
    async createUser(name:string,email:string,password:string){
        const hashedPassword = await bcryptPassword(password);

        const user = await prisma.user.create({
            data:{
                name,
                email,
                passwordHash:hashedPassword,
                createdAt: new Date()
            }
        })
        return toPublicUser(user);
    }

    async isUserExistsByEmail(email:string):Promise<boolean>{
        const count = await prisma.user.count({
            where:{email}
        }) 
        return count > 0;
    }

    async hasCorrectPassword(userId: string, password: string): Promise<Boolean> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                passwordHash: true,
            }
        })

        if (!user) return false;
        return validatePassword(password, user.passwordHash)
    }//thinking of making a new service for password


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
        console.log(user);

        if (!user) throw new Error('User not found');
        return toPublicUser(user);
    }


    async getUserById(id:string){
        const user = await prisma.user.findUnique({
            where:{id},
            select:{
                id:true,
                name:true,
                email:true,
                createdAt:true,
            }
        })
        return user;
    }
}

export const userService = new UserService();