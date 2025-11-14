import { Request, Response } from "express";
import * as tableServices from '../services/table.services.js'

export const createTableHandler = async(
    req: Request,
    res: Response
) => {
    const {tableNumber, status} = req.body;

    try {
        const {statusCode, message, data} = await tableServices.createTable(tableNumber, status);

        return res
            .status(statusCode)
            .json({message, data});
    }
    catch (error) {
        console.error(error);
        if (error instanceof Error) {
        const errorMessage = error.message;
        return res
            .status(400)
            .json({ error: "Error executing query", message: errorMessage });
        }
        return res
            .status(500)
            .json({ error: "Internal server error", message: error });
    }
}
