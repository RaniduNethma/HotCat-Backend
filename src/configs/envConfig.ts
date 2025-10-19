import dotenv from 'dotenv';

dotenv.config();

export const SERVER_PORT = process.env.SERVER_PORT
export const DATABASE_URL = process.env.DATABASE_URL

export const JWT_SECRET = process.env.JWT_SECRET
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES
export const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES