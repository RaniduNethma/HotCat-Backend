import type { Response, NextFunction } from "express";
import { AuthRequest } from "../types/types.js";
import { UserRole } from "../generated/prisma/client.js";

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!req.user.userRole || !allowedRoles.includes(req.user.userRole)) {
      return res.status(401).json({
        error: "Insufficient permissions",
        required: allowedRoles,
        current: req.user.userRole,
      });
    }

    next();
  };
};
