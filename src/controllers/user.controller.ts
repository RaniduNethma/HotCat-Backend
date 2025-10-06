import { Request, Response, NextFunction } from "express";
import * as userServices from '../services/user.services.js';

export const userRegisterController = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, first_name, last_name } = req.body
        const user = await userServices.userRegisterService(req.body);
        res.status(200).json(user);
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

export const userLoginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {userName, password} = req.body;

        if(!userName || !password){
            return res
                .status(400)
                .json({error: 'User name and password are required fields'});
        }

        const {statusCode, message, user, token} = await userServices.userLoginService(userName, password);

        return res
            .status(statusCode)
            .json({user, message, token});
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
