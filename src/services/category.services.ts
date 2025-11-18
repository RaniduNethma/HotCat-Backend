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
