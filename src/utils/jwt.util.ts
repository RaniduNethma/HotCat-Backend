import jwt from "jsonwebtoken";
import { env } from "../configs/envConfig.js";
import { TokenPayload, Tokens } from "../types/types.js";

export class JWTUtil {
  private static ACCESS_TOKEN_SECRET = env.ACCESS_TOKEN_SECRET!;
  private static REFRESH_TOKEN_SECRET = env.REFRESH_TOKEN_SECRET!;
  private static ACCESS_TOKEN_EXPIRY = env.ACCESS_TOKEN_EXPIRES;
  private static REFRESH_TOKEN_EXPIRY = env.REFRESH_TOKEN_EXPIRES;

  static generateTokens(payload: TokenPayload): Tokens {
    const accessToken = jwt.sign(payload, this.ACCESS_TOKEN_SECRET, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = jwt.sign(payload, this.REFRESH_TOKEN_SECRET, {
      expiresIn: this.REFRESH_TOKEN_EXPIRY,
    });

    return { accessToken, refreshToken };
  }

  static verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, this.ACCESS_TOKEN_SECRET) as TokenPayload;
  }

  static verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, this.REFRESH_TOKEN_SECRET) as TokenPayload;
  }

  static decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload;
    } catch {
      return null;
    }
  }
}
