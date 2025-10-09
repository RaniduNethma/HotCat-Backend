import bcrypt from'bcrypt';
import Jwt from 'jsonwebtoken';
import DB from '../../configs/dbConfig.js';
import * as types from '../../types/types.js';
import { JWT_SECRET } from '../../configs/envConfig.js';

export const createStaffUser = async (
    userName: string,
    name: string,
    phone: string,
    email: string,
    password: string
) => {
    const existingStaffUser = await DB.staff.findUnique({
        where: {userName: userName}
    });

    if(existingStaffUser != null){
        return {
            statusCode: 409,
            message: 'Username already exists',
        }
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newStaffUser = await DB.staff.create({
            data: {
                userName: userName,
                name: name,
                phone: phone,
                email: email ?? null,
                password: hashedPassword,
                role: types.Role.WAITER,
            }
        });

        const savedStaffUser = await DB.staff.findUnique({
            where: {userName: userName},
            select: {
                userName: true,
                name: true,
                phone: true,
                email: true,
                role: true
            },
        });

        return{
            statusCode: 200,
            message: "Registration successful",
            user: savedStaffUser,
        }
    }
    catch (error) {
        console.error('Error executing registration', error);
        return{
            statusCode: 500,
            message: 'Internal server error',
        };
    }
};
