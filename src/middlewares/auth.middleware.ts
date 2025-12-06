/*import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { env } from '../configs/envConfig.js'

interface JwtPayload{
    id: number;
    role: string;
}

export const auth = (roles: string[] = []) => {
    return(req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if(!token){
                return res
                    .status(401)
                    .json({message: 'Not authorized, Token missing'});
            }

            const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET!) as JwtPayload;
            req.user = decoded;

            if(roles.length && !roles.includes(decoded.role)){
                return res
                    .status(403)
                    .json({message: 'Forbidden'});
            }

            next();
        }
        catch (error) {
            console.error(error);
            if(error instanceof Error){
                const errorMessage = error.message;
                return res
                    .status(400)
                    .json({error: 'Invalid token', message: errorMessage});
            }
            return res
                .status(500)
                .json({message: 'Internal server error'});
        }
    }
}
*/
import type { Response, NextFunction } from "express";
import { JWTUtil } from "../utils/jwt.util.js";
import { AuthRequest } from "../types/types.js";

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        let token: string | undefined;

        if(authHeader && authHeader.startsWith('Bearer ')){
            token = authHeader.substring(7);
        }

        if(!token){
            token = req.cookies?.accessToken;
        }

        if(!token){
            return res.status(401).json({error: 'Authentication required'});
        }

        const decoded = JWTUtil.verifyAccessToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({error: 'Invalid or expired token'});
    }
}
