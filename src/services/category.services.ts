import DB from '../configs/dbConfig.js';
import * as types from '../types/types.js';

export const createCategory = async(
    name: string,
    description: string
) => {
    const existingCategory = await DB.category.findUnique({
        where: {name}
    });

    if(existingCategory != null){
        return {
            statusCode: 409,
            message: "Category name already exists",
        };
    }

    try {
        const newCategory = await DB.category.create({
            data: {
                name: name,
                description: description
            }
        });

        return {
            statusCode: 200,
            message: 'Create category successful',
            data: newCategory
        };
    }
    catch (error) {
        console.error("Error executing createCategory", error);
        return {
            statusCode: 500,
            message: "Internal server error",
        };
    }
}

export const getAllCategories = async(
    page: number
) => {
    const limit: number = 10;
    const skip: number = (page - 1) * limit;

    try {
        const allCategories = await DB.category.findMany({
            take: limit,
            skip,
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true
            }
        });

        return {
            statusCode: 200,
            data: allCategories
        };
    }
    catch (error) {
        console.error("Error executing getAllCategories", error);
        return {
            statusCode: 500,
            message: "Internal server error",
        };
    }
}

export const getCategoryById = async(
    id: number
) => {
    try {
        const getCategory = await DB.category.findUnique({
            where: {id},
            select: {
                id: true,
                name: true,
                description: true,
                createdAt: true
            }
        });

        if(getCategory == null){
            return {
                statusCode: 404,
                message: `Category with id ${id} not found`
            }
        }

        return {
            statusCode: 200,
            data: getCategory
        };
    }
    catch (error) {
        console.error("Error executing getCategoryById", error);
        return {
            statusCode: 500,
            message: "Internal server error",
        };
    }
}
