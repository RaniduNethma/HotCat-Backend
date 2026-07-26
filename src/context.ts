import { Request } from 'express';
import { TokenPayload } from './types/types.js';
import { JWTUtil } from './utils/jwt.util.js';

export interface AuthContext {
  user: TokenPayload | null;
}

export const getContext = async ({ req }: { req: Request }): Promise<AuthContext> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { user: null };
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return { user: null };
    }

    const decoded = JWTUtil.verifyAccessToken(token);

    return { user: decoded };
  } catch (error) {
    return { user: null };
  }
};
