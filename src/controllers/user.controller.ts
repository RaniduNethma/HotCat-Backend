import { Request, Response, NextFunction } from "express";
import * as userServices from '../services/user.services.js';

export const register = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userServices.register(req.body);
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
