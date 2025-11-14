import DB from '../configs/dbConfig.js'
import * as types from '../types/types.js'

export const createTable = async(
    tableNumber: number,
    status: types.TableStatus
) => {
    try {
        const existingTable = await DB.table.findUnique({
            where: {tableNumber}
        });

        if(existingTable != null){
            return{
                statusCode: 409,
                message: 'Table number already exists'
            }
        }

        const newTable = await DB.table.create({
            data: {
                tableNumber: tableNumber,
                status: status
            },
        });

        return {
            statusCode: 200,
            message: 'Create table successful',
            data: newTable
        }
    }
    catch (error) {
        console.error("Error executing createTable", error);
        return {
            statusCode: 500,
            message: "Internal server error",
        };
    }
}

