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
  body: z.object({
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
  }),
});

const updateTableSchema = z.object({
  body: z.object({
    id: z.number(),
    tableNumber: z.number().optional(),
    capacity: z.number().optional(),
    tableType: z.enum(["INDOOR", "OUTDOOR", "VIP"]).optional(),
    tableStatus: z
      .enum(["AVAILABLE", "OCCUPIED", "RESERVED", "CLEANING", "REPAIRING"])
      .optional(),
    qrCode: z.string().optional(),
    isActive: z.boolean().optional(),
  }),
});

const pageSchema = z.object({
  query: z.object({
    page: z.string(),
  }),
});

const tableIdSchema = z.object({
  query: z.object({
    categoryId: z.string(),
  }),
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
  validate(pageSchema),
  tableController.getAllTables
);

tableRouter.get(
  "/available",
  authenticate,
  validate(pageSchema),
  tableController.getAvailableTables
);

tableRouter.get(
  "/id",
  authenticate,
  validate(tableIdSchema),
  tableController.getTableById
);

tableRouter.put(
  "/update",
  authenticate,
  validate(updateTableSchema),
  authorizeRoles(
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.OFFICER,
    UserRole.WAITER
  ),
  tableController.updateTable
);

export default tableRouter;
