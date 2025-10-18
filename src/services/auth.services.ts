import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DB from "../configs/dbConfig.js";
import * as types from "../types/types.js";
import { JWT_SECRET } from "../configs/envConfig.js";

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
  password: string
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

    const accessToken = jwt.sign({ id: user.id, role: "USER" }, JWT_SECRET!, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ id: user.id}, JWT_SECRET!, {
      expiresIn: "7d",
    });

    return {
      statusCode: 200,
      message: "Login successfull",
      user: userData,
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
