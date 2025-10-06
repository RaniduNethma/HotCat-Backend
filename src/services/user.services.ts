import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import DB from '../configs/dbConfig.js';
import * as types from '../types/types.js';
import { JWT_SECRET } from '../configs/envConfig.js';

export const userRegisterService = async (data: types.User) => {
    try {
        const existingUser = await DB.user.findUnique({
            where: {userName: data.userName}
        });

        if(existingUser != null){
            return{
                statusCode: 409,
                message: 'Username already exists'
            }
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await DB.user.create({
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

        const savedUser = await DB.user.findUnique({
            where: {userName: data.userName}
        });

        return{
            statusCode: 200,
            message: 'Registration successful',
            user: savedUser
        }
    }
    catch (error) {
        console.error('Error executing registration', error);
        return{
            statusCode: 500,
            message: 'Internal server error'
        }
    }
}

export const userLoginService = async (data: { userName: string; password: string; }, password: any) => {
    try {
        const user = await DB.user.findUnique({
            where: {userName: data.userName},
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
