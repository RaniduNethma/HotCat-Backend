import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DB from "../configs/dbConfig.js";
import {RegisterDTO, LoginDTO, TokenPayload} from "../types/types.js";
import { env } from "../configs/envConfig.js";
import { JWTUtil } from "../utils/jwt.util.js";

export class AuthService{
  async register(data: RegisterDTO){
    const existingUser = await DB.user.findUnique({
      where: { userName: data.userName },
    });

    if (existingUser != null) {
      return {
        statusCode: 409,
        message: "Username already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await DB.user.create({
      data: {
        userName: data.userName,
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        userRole: data.userRole || 'CUSTOMER',
        password: hashedPassword,
        profiles: {
          create: {
            profileType: data.profileType || 'BRONZE',
            address: data.address ?? null,
            city: data.city ?? null
          }
        }
      },
      select: {
        id: true,
        userName: true,
        name: true,
        phone: true,
        email: true,
        dateOfBirth: true,
        userRole: true,
        profiles: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return {
      statusCode: 200,
      message: "Registration successful",
      user: newUser,
    };
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

      const accessToken = generateAccessToken({id: user.id, role: user.role});
      const refreshToken = generateRefreshToken({id: user.id, role: user.role});

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

  export const logoutUser = async (id: number) => {
    try {
      await DB.user.update({
        where: { id: id },
        data: {refreshToken: null}
      });

      return {
        statusCode: 200,
        message: 'Logout successful'
      };
    }
    catch (error) {
      console.error("Error executing logout", error);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }
}