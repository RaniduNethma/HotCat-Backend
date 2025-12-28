import { Router } from "express";
import { PriceListController } from "../controllers/priceList.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { UserRole } from "../generated/prisma/enums.js";
import z from "zod";

const priceListRouter = Router();
const priceListController = new PriceListController();

const PriceListItemsSchema = z.object({
  body: z.object({
    productId: z.number(),
    price: z.number(),
  }),
});

const CreatePriceListSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    isActive: z.boolean(),
    isDefault: z.boolean(),
    startDate: z.date(),
    endDate: z.date(),
    items: z.array(PriceListItemsSchema),
  }),
});

priceListRouter.post(
  "/create",
  authenticate,
  validate(CreatePriceListSchema),
  authorizeRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OFFICER),
  priceListController.createPriceList
);
