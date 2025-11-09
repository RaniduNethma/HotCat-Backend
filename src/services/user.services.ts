import DB from '../configs/dbConfig.js';
import * as types from "../types/types.js";

export const getAllUsers = async (
    page: number
) => {
    const limit: number = 10;
    const skip: number = (page - 1) * limit;

    try {
        const allUsers = await DB.user.findMany({
            take: limit,
            skip,
            select: {
                id: true,
                userName: true,
                name: true,
                role: true
            }
        });

        return{
            statusCode: 200,
            data: allUsers
        };
    }
    catch (error) {
        console.error("Error executing getAllUsers", error);
        return {
        statusCode: 500,
        message: "Internal server error",
        };
    }
}

export const getUserById = async (id: number) => {
    try {
        if (!id) {
            return {
                statusCode: 404,
                message: `User with id ${id} not found`
            }
        }

        const user = await DB.user.findUnique({
            where: { id },
            select: {
                id: true,
                userName: true,
                name: true,
                phone: true,
                email: true,
                dateOfBirth: true,
                profileType: true,
                role: true,
                createdAt: true,
            }
        });

        return {
            statusCode: 200,
            data: user
        };
    }
    catch (error) {
        console.error("Error executing getUserById", error);
        return {
            statusCode: 500,
            message: "Internal server error",
        };
    }
}

export const updateUser = async (
    id: number,
    NewUserName: string,
    newName: string,
    newPhone: string,
    newEmail: string,
    newDateOfBirth: Date,
    newProfileType: types.ProfileType,
    newRole: types.Role
) => {
    try {
        if(!id){
            return{
                statusCode: 404,
                message: `User with id ${id} not found`
            };
        }

        await DB.user.update({
            where: { id: id },
            data: {
                userName: NewUserName,
                name: newName,
                phone: newPhone,
                email: newEmail,
                dateOfBirth: newDateOfBirth,
                profileType: newProfileType,
                role: newRole
            }
        });

        const user = await DB.user.findUnique({
            where: { id },
            select: {
                id: true,
                userName: true,
                name: true,
                phone: true,
                email: true,
                dateOfBirth: true,
                profileType: true,
                role: true,
                createdAt: true,
            }
        });

        return {
            statusCode: 200,
            message: "User data updated successfully",
            data: user
        };
    }
    catch (error) {
        console.error("Error executing getUserById", error);
        return {
            statusCode: 500,
            message: "Internal server error",
        };
    }
}
