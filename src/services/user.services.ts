import DB from '../configs/dbConfig.js';

export const getAllUsers = async (
    page: number
) => {
    const limit: number = 10;
    const skip: number = (page - 1) * limit;

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
