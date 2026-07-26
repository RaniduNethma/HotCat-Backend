import bcrypt from 'bcrypt';
import DB from '../configs/dbConfig.js';
import { RegisterDTO, LoginDTO, TokenPayload } from '../types/types.js';
import { JWTUtil } from '../utils/jwt.util.js';

export class AuthService {
  async register(data: RegisterDTO) {
    const existingUser = await DB.user.findUnique({
      where: { userName: data.userName },
    });

    if (existingUser != null) {
      throw new Error('Username already exists');
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
    });

    return {
      success: true,
      statusCode: 201,
      message: 'Registration successful',
      data: newUser,
    };
  }

  async login(data: LoginDTO) {
    const user = await DB.user.findUnique({
      where: { userName: data.userName },
    });

    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      throw new Error('Invalid credentials');
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
      success: true,
      statusCode: 200,
      message: 'Login successful',
      data: {
        user,
        tokens,
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
        throw new Error('Invalid refresh token');
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
        success: true,
        statusCode: 200,
        message: 'Token refreshed successfully',
        data: {
          user,
          tokens,
        },
      };
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async logout(id: number) {
    await DB.user.update({
      where: { id: id },
      data: { refreshToken: null },
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Logged out successfully',
    };
  }

  async getProfile(id: number) {
    const user = await DB.user.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      success: true,
      statusCode: 200,
      message: 'Profile fetched successfully',
      data: user,
    };
  }
}
