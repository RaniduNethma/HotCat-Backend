import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DB from "../configs/dbConfig.js";
import * as types from "../types/types.js";
import { JWT_SECRET, REFRESH_TOKEN_SECRET } from "../configs/envConfig.js";
//import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

export const createUser = async (
  userName: string, 
  name: string, 
  phone: string, 
  email: string, 
  dateOfBirth: Date, 
  password: string
) => {
  const existingUser = await DB.user.findUnique({
    where: { userName: userName },
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
        password: hashedPassword,
      },
    });

    const savedUser = await DB.user.findUnique({
      where: { userName: userName },
      select: {
        id: true,
        userName: true,
        name: true,
        phone: true,
        email: true,
        dateOfBirth: true,
        profileType: true,
        createdAt: true
      },
    });

    return {
      statusCode: 200,
      message: "Registration successful",
      user: savedUser,
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
  password: string,
) => {
  try {
    const user = await DB.user.findUnique({
      where: { userName: userName },
      select: {
        id: true,
        userName: true,
        email: true,
        password: true
      },
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
    }

    const userData = await DB.user.findUnique({
      where: {userName: userName},
      select: {
        id: true,
        userName: true,
        name: true,
        phone: true,
        email: true,
        dateOfBirth: true,
        profileType: true,
        createdAt: true
      },
    });

    /*const accessToken = generateAccessToken({id: user.id, role: "user"});
    const refreshToken = generateRefreshToken({id: user.id, role: "user"});

    await DB.user.update({
      where: { id: user.id },
      data: { refreshToken: refreshToken},
    });*/

    return {
      statusCode: 200,
      message: "Login successfull",
      user: userData,
      //accessToken,
      //refreshToken
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
/*
export const refreshToken = async (token: string) => {
  const decoded: any = jwt.verify(token, REFRESH_TOKEN_SECRET!);

  const user = await DB.user.findUnique({
    where: {id: decoded.id}
  });

  if (!user || user.refreshToken !== token) throw new Error("Invalid refresh token");

  const newAccessToken = generateAccessToken({id: user.id, role: 'user'});
  const newRefreshToken = generateRefreshToken({id: user.id, role: 'user'});

  await DB.user.update({
    where: {id: user.id},
    data: {refreshToken: newRefreshToken}
  });

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
}
*/