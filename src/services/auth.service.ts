import bcrypt from "bcrypt";
import DB from "../configs/dbConfig.js";
import { RegisterDTO, LoginDTO, TokenPayload } from "../types/types.js";
import { JWTUtil } from "../utils/jwt.util.js";

export class AuthService {
  async register(data: RegisterDTO) {
    const existingUser = await DB.user.findUnique({
      where: { userName: data.userName },
    });

    if (existingUser != null) {
      return {
        success: false,
        statusCode: 409,
        message: "Username already exists",
        data: null,
      };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const defaultPriceList = await DB.priceList.findFirst({
      where: { isActive: true, isDefault: true },
    });

    const newUser = await DB.user.create({
      data: {
        userName: data.userName,
        name: data.name,
        phone: data.phone,
        email: data.email ?? null,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        userRole: data.userRole,
        password: hashedPassword,
        profileType: data.profileType,
        address: data.address ?? null,
        city: data.city ?? null,
        priceListId: defaultPriceList?.id || null,
      },
      select: {
        id: true,
        userName: true,
        name: true,
        phone: true,
        email: true,
        dateOfBirth: true,
        userRole: true,
        profileType: true,
        address: true,
        city: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        priceList: true,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: "Registration successful",
      data: newUser,
    };
  }

  async login(data: LoginDTO) {
    const user = await DB.user.findUnique({
      where: { userName: data.userName },
    });

    if (!user || !user.isActive) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const payload: TokenPayload = {
      id: user.id,
      userName: user.userName,
      userRole: user.userRole,
      profileType: user.profileType,
    };

    const tokens = JWTUtil.generateTokens(payload);

    await DB.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    return {
      tokens,
      user: {
        id: user.id,
        userName: user.userName,
        name: user.name,
        userRole: user.userRole,
        profileType: user.profileType,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = JWTUtil.verifyRefreshToken(refreshToken);

      const user = await DB.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user || user.refreshToken !== refreshToken || !user.isActive) {
        throw new Error("Invalid refresh token");
      }

      const payload: TokenPayload = {
        id: user.id,
        userName: user.userName,
        userRole: user.userRole,
        profileType: user.profileType,
      };

      const tokens = JWTUtil.generateTokens(payload);

      await DB.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
      });

      return tokens;
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  async logout(id: number) {
    await DB.user.update({
      where: { id: id },
      data: { refreshToken: null },
    });
  }

  async getProfile(id: number) {
    const user = await DB.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        userName: true,
        name: true,
        phone: true,
        email: true,
        dateOfBirth: true,
        userRole: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        profileType: true,
        address: true,
        city: true,
        priceList: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return {
      success: true,
      data: user,
    };
  }
}
