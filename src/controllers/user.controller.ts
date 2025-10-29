import { Request, Response } from "express";
import * as userServices from '../services/user.services.js';

export const getAllUsersHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const {page} = req.body;

        if(!req.user){
            return res
                .status(401)
                .json({message: 'Unauthorized'});
        }

        const {statusCode, data} = await userServices.getAllUsers(page);

        return res
            .status(statusCode)
            .json({data});
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

export const getUserHandler = async (
    req: Request,
    res: Response
)=> {
    if(!req.user || req.user.id !== req.params.id) {
        return res
            .status(401)
            .json({ error: "Not authorized to access this profile"});
    }

    try {
        const {id} = req.params.id;

        const {statusCode, data} = await userServices.getUserById(id);
        return res
            .status(statusCode)
            .json({data});
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