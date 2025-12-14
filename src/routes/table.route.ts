import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { TableController } from "../controllers/table.controller.js";
import { UserRole } from "../generated/prisma/client.js";
import { z } from "zod";
import { validate } from "../middlewares/validation.middleware.js";

const tableRouter = Router();
const tableController = new TableController();

const createTableSchema = z.object({
  tableNumber: z.number(),
  capacity: z.number(),
  tableType: z.enum(["INDOOR", "OUTDOOR", "VIP"]),
  tableStatus: z.enum([
    "AVAILABLE",
    "OCCUPIED",
    "RESERVED",
    "CLEANING",
    "REPAIRING",
  ]),
  qrCode: z.string(),
  isActive: z.boolean(),
});

const updateTableSchema = z.object({
  id: z.number(),
  tableNumber: z.number(),
  capacity: z.number(),
  tableType: z.enum(["INDOOR", "OUTDOOR", "VIP"]),
  tableStatus: z.enum([
    "AVAILABLE",
    "OCCUPIED",
    "RESERVED",
    "CLEANING",
    "REPAIRING",
  ]),
  qrCode: z.string(),
  isActive: z.boolean(),
});

tableRouter.post(
  "/create",
  authenticate,
  validate(createTableSchema),
  authorizeRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OFFICER),
  tableController.createTable
);

tableRouter.get(
  "/",
  authenticate,
  authorizeRoles(
    UserRole.ADMIN,
    UserRole.CHEF,
    UserRole.MANAGER,
    UserRole.OFFICER,
    UserRole.WAITER
  ),
  tableController.getAllTables
);

tableRouter.get(
  "/available",
  authenticate,
  authorizeRoles(
    UserRole.ADMIN,
    UserRole.CHEF,
    UserRole.MANAGER,
    UserRole.OFFICER,
    UserRole.WAITER
  ),
  tableController.getAvailableTables
);

tableRouter.get(
  "/id",
  authenticate,
  authorizeRoles(
    UserRole.ADMIN,
    UserRole.CHEF,
    UserRole.MANAGER,
    UserRole.OFFICER,
    UserRole.WAITER
  ),
  tableController.getTableById
);

tableRouter.post(
  "/update",
  authenticate,
  validate(updateTableSchema),
  authorizeRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OFFICER),
  tableController.updateTable
);

export default tableRouter;
