import { Request, Response, NextFunction } from "express";
import { appError } from "../errors/appError.js";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof appError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      status: "error",
      message: "Token expired",
    });
  }

  // Log unexpected errors
  console.error("Unexpected error:", err);

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
