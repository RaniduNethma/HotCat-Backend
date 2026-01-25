import { Request, Response, NextFunction } from "express";
import { appError } from "../errors/appError.js";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof appError){
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    }
}