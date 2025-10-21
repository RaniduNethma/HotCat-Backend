import { Request, Response, NextFunction } from "express";
import * as AuthServices from "../services/auth.services.js";
import jwt from "jsonwebtoken";
import { env } from "../configs/envConfig.js";
import { log } from "console";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    //console.log("REQ BODY:", req.body);
    const {userName, name, phone, email, dateOfBirth, password} = req.body;

    if(!userName || !password){
      return res
        .status(400)
        .json({error: 'Username and password are required fields'});
    }

    const { statusCode, message, user} = await AuthServices.createUser(
      userName, name, phone, email, dateOfBirth, password
    );
    
    res.status(statusCode).json({message, user});
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

export const logoutController = async (
  req: Request,
  res: Response
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
      return res
        .status(401)
        .json({message: "Access token required"});
    }

    const decoded: any = jwt.verify(token, env.ACCESS_TOKEN_SECRET!);

    const result = await AuthServices.logout(decoded.userName);

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