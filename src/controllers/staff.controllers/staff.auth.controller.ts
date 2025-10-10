import { NextFunction, Request, Response } from "express";
import * as staffAuthServices from '../../services/staff.services/staff.auth.services.js';

export const staffSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userName, name, phone, email, password } = req.body;

    if(!userName || !password){
        return res
            .status(400)
            .json({error: 'Username and password are required fields'});
    }

    try {
        const {statusCode, message, user} = await staffAuthServices.createStaffUser(
            userName, name, phone, email, password
        );

        res.status(statusCode).json({message, user});
    }
    catch (error) {
        console.error(error);
        if(error instanceof Error){
            const errorMessage = error.message;
            return res
                .status(400)
                .json({error: 'Error executing query', message: errorMessage});
        }
        return res
            .status(500)
            .json({error: 'Internal server error', message: error});
    }
}

export const staffLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userName, password } = req.body;

    if(!userName || !password){
        return res
            .status(400)
            .json({error: 'Username and password are required fields'});
    }

    try {
        const { statusCode, message, user, token } = 
            await staffAuthServices.staffUserLogin(userName, password);

        return res.status(statusCode).json({message, user, token});
    }
    catch (error) {
        console.error(error);
        if(error instanceof Error){
            const errorMessage = error.message;
            return res
                .status(400)
                .json({error: 'Error executing query', message: errorMessage});
        }
        return res
            .status(500)
            .json({error: 'Internal server error', message: error});
    }
}
