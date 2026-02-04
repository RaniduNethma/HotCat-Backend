import dotenv from "dotenv";
import { EnvConfig } from "../types/types.js";

dotenv.config();

function getEnvVariable(key: any, required = true): any {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value as string;
}

export const env: EnvConfig = {
  NODE_ENV: getEnvVariable("NODE_ENV"),
  SERVER_PORT: Number(getEnvVariable("SERVER_PORT")),
  DATABASE_URL: getEnvVariable("DATABASE_URL"),
  ACCESS_TOKEN_SECRET: getEnvVariable("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: getEnvVariable("REFRESH_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRES: getEnvVariable("ACCESS_TOKEN_EXPIRES"),
  REFRESH_TOKEN_EXPIRES: getEnvVariable("REFRESH_TOKEN_EXPIRES"),
  REDIS_HOST: getEnvVariable("REDIS_HOST"),
  REDIS_PORT: getEnvVariable("REDIS_PORT"),
  REDIS_PASSWORD: getEnvVariable("REDIS_PASSWORD"),
  CLIENT_URL: getEnvVariable("CLIENT_URL"),
};
