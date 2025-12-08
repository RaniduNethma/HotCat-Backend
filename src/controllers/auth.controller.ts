import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/types.js";
import { AuthService } from "../services/auth.service.js";
import { env } from "../configs/envConfig.js";

export class AuthController{
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.register(req.body);

      res.status(201).json({
        success: true,
        data: user,
        message: 'User registered successfully'
      });
    }
    catch (error: any) {
      if (error.message === 'User already exists'){
        return res.status(409).json({error: error.message});
      }
      next(error);
    }
  };

  login = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.login(req.body);

      // Set Cookies
      res.cookie('accessToken', result.tokens.accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Days
      });

      res.json({
        success: true,
        data: {
          user: result.user,
          accessToken: result.tokens.accessToken;
        },
        message: 'Login successful'
      });
    }
    catch (error: any) {
      if (error.message === 'Invalid credentials'){
        return res.status(401).json({error: error.message});
      }
      next(error);
    }
  };

  refreshToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

      if(!refreshToken){
        return res.status(401).json({error: 'Refresh token required'});
      }
      
      const tokens = await this.authService.refreshToken(refreshToken);

      // Update Cookies
      res.cookie('accessToken', tokens.accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000 // 15 Minutes
      });

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 Days
      });

      res.json({
        success: true,
        data: {accessToken: tokens.accessToken},
        message: 'Token refreshed successfully'
      });
    }
    catch (error: any) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      return res.status(401).json({error: 'Invalid refresh token'});
    }
  };

  export const logout = async (
    req: Request,
    res: Response
  ) => {
    try {
      const user = req.user as {id: number; role: string};

      if(!req.user){
        return res
          .status(401)
          .json({message: 'Unauthorized'});
      }

      const result = await AuthServices.logoutUser(user.id);

      return res
        .status(result.statusCode)
        .json({message: result.message});
    }
    catch (error) {
      console.error(error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        return res
          .status(400)
          .json({ error: "Error executing query (Controller)", message: errorMessage });
      }
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  }
}