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
    const id = req.query.id?.toString();
    const tokenId = req.user?.id?.toString();
    
    if(!id || tokenId !== id) {
        return res
            .status(401)
            .json({ error: "Not authorized to access this profile"});
    }

    try {
        const id: any = req.params.id || req.query.id;

        const {statusCode, data} = await userServices.getUserById(Number(id));
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

export const updateUserHandler = async (
    req: Request,
    res: Response
) => {
    const id = req.query.id?.toString();
    const tokenId = req.user?.id?.toString();

    if(!id || tokenId !== id) {
        return res
            .status(401)
            .json({ error: "Not authorized to access this profile"});
    }

    try {
        const id: any = req.params.id || req.query.id;

        const {NewUserName, newName, newPhone, newEmail, newDateOfBirth, newProfileType, newRole} = req.body;

        const {statusCode, data} = await userServices.updateUser(Number(id), NewUserName, newName, newPhone, newEmail, newDateOfBirth, newProfileType, newRole);

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
