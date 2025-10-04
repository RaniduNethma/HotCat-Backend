import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import DB from '../configs/dbConfig.js';
import type { User } from '../types/types.js';

export const userRegisterService = async (data: User) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await DB.user.create({
        data: {
            userName: data.userName,
            name: data.name,
            phone: data.phone,
            email: data.email,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
            profileType: "BRONZE",
            password: hashedPassword
        }
    });
    return user;
}

export const userLoginService = async (data: {email: string; password: string}) => {
 const user = await DB.profileType.findUnique({
    where: {email: data.email},
 });
}