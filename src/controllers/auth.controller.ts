import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/types.js";
import { AuthService } from "../services/auth.service.js";

export class AuthController{
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
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

  export const login = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { userName, password } = req.body;

      if (!userName || !password) {
        return res
          .status(400)
          .json({ error: "User name and password are required fields" });
      }

      const { statusCode, message, user, accessToken, refreshToken} =
        await AuthServices.loginUser(userName, password);

      return res.status(statusCode).json({ user, message, accessToken, refreshToken});
    }
    catch (error) {
      console.error(error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        return res
          .status(400)
          .json({ error: "Error executing query", message: errorMessage });
      }
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  };

  export const refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.body.refreshToken;
      const newToken = await AuthServices.tokenGenerater(token);

      return res
        .status(200)
        .json(newToken);
    }
    catch (error) {
      console.error(error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        return res
          .status(400)
          .json({ error: "Error executing query", message: errorMessage });
      }
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  }

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