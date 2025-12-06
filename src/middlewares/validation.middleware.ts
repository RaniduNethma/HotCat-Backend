import { Request, Response, NextFunction } from "express";
import { z } from 'zod';

export const validate = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if(error instanceof z.ZodError){
                return res.status(400).json({
                    error: 'Validation failed',
                    details: error
                });
            }
            next(error);
        }
    };
};
