import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { UserRole } from "../generated/prisma/enums.js";
import { validate } from "../middlewares/validation.middleware.js";
import { ProductController } from "../controllers/product.controller.js";
import z from "zod";

const productRouter = Router();
const productController = new ProductController();

const createProductSchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    sortOrder: z.number(),
    isActive: z.boolean(),
    stock: z.number(),
    categoryId: z.number(),
  }),
});

const updateProductSchema = z.object({
  body: z.object({
    id: z.number(),
    name: z.string().optional(),
    description: z.string().optional(),
    imageUrl: z.string().optional(),
    sortOrder: z.number().optional(),
    isActive: z.boolean().optional(),
    stock: z.number().optional(),
    categoryId: z.number().optional(),
  }),
});

const pageSchema = z.object({
  query: z.object({
    page: z.string(),
  }),
});

const productIdSchema = z.object({
  query: z.object({
    id: z.string(),
  }),
});

productRouter.post(
  "/create",
  authenticate,
  validate(createProductSchema),
  authorizeRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OFFICER),
  productController.createProduct
);

productRouter.get(
  "/",
  authenticate,
  validate(pageSchema),
  productController.getProducts
);

productRouter.get(
  "/available",
  authenticate,
  validate(pageSchema),
  productController.availableProducts
);

productRouter.get(
  "/id",
  authenticate,
  validate(productIdSchema),
  productController.productById
);

productRouter.put(
  "/update",
  authenticate,
  validate(updateProductSchema),
  authorizeRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OFFICER),
  productController.updateProducts
);

export default productRouter;
