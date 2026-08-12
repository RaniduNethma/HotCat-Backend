import { Request } from 'express';
import { TokenPayload } from './types/types.js';
import { JWTUtil } from './utils/jwt.util.js';
import { createCategoryLoader } from './loaders/category.loader.js';

export interface AuthContext {
  user: TokenPayload | null;
  loaders: {
    categoryLoader: ReturnType<typeof createCategoryLoader>;
  };
}

export const getContext = async ({ req }: { req: Request }): Promise<AuthContext> => {
  const loaders = {
    categoryLoader: createCategoryLoader(),
  };

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { user: null, loaders };
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return { user: null, loaders };
    }

    const decoded = JWTUtil.verifyAccessToken(token);

    return { user: decoded, loaders };
  } catch (error) {
    return { user: null, loaders };
  }
};
