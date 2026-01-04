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

const UpdatePriceListSchema = z.object({
  body: z.object({
    id: z.number(),
    name: z.string().optional(),
    description: z.string().optional(),
    isActive: z.boolean().optional(),
    isDefault: z.boolean().optional(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
    items: z.array(PriceListItemsSchema).optional(),
  }),
});

const pageSchema = z.object({
  query: z.object({
    page: z.string(),
  }),
});

const priceListIdSchema = z.object({
  query: z.object({
    id: z.string(),
  }),
});

priceListRouter.post(
  "/create",
  authenticate,
  validate(CreatePriceListSchema),
  authorizeRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OFFICER),
  priceListController.createPriceList
);

priceListRouter.get(
  "/",
  authenticate,
  validate(pageSchema),
  priceListController.allPriceLists
);

priceListRouter.get(
  "/available",
  authenticate,
  validate(pageSchema),
  priceListController.allPriceLists
);

priceListRouter.get(
  "/id",
  authenticate,
  validate(priceListIdSchema),
  priceListController.priceListById
);

priceListRouter.put(
  "/update",
  authenticate,
  validate(UpdatePriceListSchema),
  authorizeRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OFFICER),
  priceListController.updatePriceList
);
