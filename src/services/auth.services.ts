import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DB from "../configs/dbConfig.js";
import * as types from "../types/types.js";
import { env } from "../configs/envConfig.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const createUser = async (
  userName: string, 
  name: string, 
  phone: string, 
  email: string, 
  dateOfBirth: Date,
  password: string
) => {
  const existingUser = await DB.user.findUnique({
    where: { userName },
  });

  if (existingUser != null) {
    return {
      statusCode: 409,
      message: "Username already exists",
    };
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await DB.user.create({
      data: {
        userName: userName,
        name: name,
        phone: phone,
        email: email ?? null,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        profileType: types.ProfileType.BRONZE,
        role: types.Role.USER,
        password: hashedPassword,
      },
    });

    const safeUser = excludePassword(newUser);

    return {
      statusCode: 200,
      message: "Registration successful",
      user: safeUser,
    };
  }
  catch (error) {
    console.error("Error executing registration", error);
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
};

export const loginUser = async (
  userName: string,
  password: string
) => {
  try {
    const user = await DB.user.findUnique({
      where: { userName }
    });

    if (!user) {
      return {
        statusCode: 401,
        message: "Invalid email or password",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        statusCode: 401,
        message: "Invalid email or password",
      };
    };

    const accessToken = generateAccessToken({id: user.id, role: "USER"});
    const refreshToken = generateRefreshToken({id: user.id, role: "USER"});

    await DB.user.update({
      where: { id: user.id },
      data: { refreshToken: refreshToken},
    });

    const safeUser = excludePassword(user);

    return {
      statusCode: 200,
      message: "Login successfull",
      user: safeUser,
      accessToken,
      refreshToken
    };
  }
  catch (error) {
    console.error("Error executing login", error);
    return {
      statusCode: 500,
      message: "Internal server error",
    };
  }
};

export const excludePassword = (user: any) => {
  if(!user) return null;
  const {password, ...safeUser} = user;
  return safeUser;
};


export const tokenGenerater = async (token: string) => {
  const decoded: any = jwt.verify(token, env.REFRESH_TOKEN_SECRET!);

  const user = await DB.user.findUnique({
    where: {id: decoded.id}
  });

  if (!user || user.refreshToken !== token) throw new Error("Invalid refresh token");

  const newAccessToken = generateAccessToken({id: user.id, role: user.role});
  const newRefreshToken = generateRefreshToken({id: user.id, role: user.role});

  await DB.user.update({
    where: {id: user.id},
    data: {refreshToken: newRefreshToken}
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
}
