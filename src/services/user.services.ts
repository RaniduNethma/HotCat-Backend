import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DB from '../configs/dbConfig.js';
import * as types from '../types/types.js';
import { JWT_SECRET } from '../configs/envConfig.js';

export const userRegisterService = async (data: types.User) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await DB.user.create({
        data: {
            userName: data.userName,
            name: data.name,
            phone: data.phone,
            email: data.email ?? null,
            dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
            profileType: types.ProfileType.BRONZE,
            password: hashedPassword
        }
    });
    return user;
}

export const userLoginService = async (data: { email: string; password: string; }, password: any) => {
    try {
        const user = await DB.user.findUnique({
            where: {email: data.email},
        });

        if(!user){
            return{
                statusCode: 401,
                message: 'Invalid email or password'
            }
        }

        const isMatch = await bcrypt.compare(data.password, user.password);

        if(!isMatch){
            return{
                statusCode: 401,
                message: 'Invalid email or password'
            }
        }

        const token = jwt.sign(
            {id: user.id, role: 'USER'},
            JWT_SECRET!,
            {expiresIn: '1h'}
        );

        return {
            statusCode: 200,
            message: 'Login successfull',
            user: user,
            token
        }
    }
    catch (error) {
        console.error('Error executing login', error);
        return{
            statusCode: 500,
            message: 'Internal server error'
        }
    }
}
