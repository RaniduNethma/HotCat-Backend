import { Request, Response, NextFunction } from "express";
import * as AuthServices from "../services/auth.services.js";

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

    const { statusCode, message, user, token } =
      await AuthServices.loginUser(userName, password);

    return res.status(statusCode).json({ user, message, token });
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
