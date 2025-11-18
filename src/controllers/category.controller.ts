import { Request, Response } from 'express';
import * as categoryServices from '../services/category.services.js';

export const createCategoryHandler = async(
    req: Request,
    res: Response
) => {
    const {name, description} = req.body;

    try {
        const {statusCode, message, data} = await categoryServices.createCategory(name, description);

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
