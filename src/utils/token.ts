import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, 
    REFRESH_TOKEN_SECRET, 
    ACCESS_TOKEN_EXPIRES, 
    REFRESH_TOKEN_EXPIRES } from "../configs/envConfig.js";

/*export const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET!, {
        expiresIn: ACCESS_TOKEN_EXPIRES || '15m',
    });
};

export const generateRefreshToken = (payload: object) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET!, {
        expiresIn: REFRESH_TOKEN_EXPIRES || '7d',
    });
};*/

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET!);
};
