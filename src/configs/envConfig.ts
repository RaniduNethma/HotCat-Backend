import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
    SERVER_PORT: number;
    DATABASE_URL: string;
    JWT_SECRET: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRES: number;
    REFRESH_TOKEN_EXPIRES: number;
}

function getEnvVariable(key: any, required = true): any {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value as string;
}

export const env: EnvConfig = {
  SERVER_PORT: Number(getEnvVariable("SERVER_PORT")),
  DATABASE_URL: getEnvVariable("DATABASE_URL"),
  JWT_SECRET: getEnvVariable("JWT_SECRET"),
  ACCESS_TOKEN_SECRET: getEnvVariable("ACCESS_TOKEN_SECRET"),
  REFRESH_TOKEN_SECRET: getEnvVariable("REFRESH_TOKEN_SECRET"),
  ACCESS_TOKEN_EXPIRES: getEnvVariable("ACCESS_TOKEN_EXPIRES"),
  REFRESH_TOKEN_EXPIRES: getEnvVariable("REFRESH_TOKEN_EXPIRES"),
};