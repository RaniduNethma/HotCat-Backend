import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DB from '../configs/dbConfig.js';
import { type User } from '../types/types.js';
import { JWT_SECRET } from '../configs/envConfig.js';

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

    if(!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if(!isMatch){
        throw new Error ('Invalid credentials');
    }

    const token = jwt.sign(
        {id: user.id, role: 'USER'},
        JWT_SECRET!,
        {expiresIn: '1h'}
    );

    return token;
}
