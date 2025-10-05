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
    try {
        const user = await DB.profileType.findUnique({
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
