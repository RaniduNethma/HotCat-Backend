import jwt from "jsonwebtoken";
import { env } from "../configs/envConfig.js";

export const generateAccessToken = (payload: object): string => {
    return jwt.sign(payload, env.ACCESS_TOKEN_SECRET!, {
        expiresIn: env.ACCESS_TOKEN_EXPIRES,
    });
};

export const generateRefreshToken = (payload: object): string => {
    return jwt.sign(payload, env.REFRESH_TOKEN_SECRET!, {
        expiresIn: env.REFRESH_TOKEN_EXPIRES,
    });
};

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET!);
};
