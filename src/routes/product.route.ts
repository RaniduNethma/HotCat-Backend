import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { UserRole } from "../generated/prisma/enums.js";
import { validate } from "../middlewares/validation.middleware.js";
import { ProductController } from "../controllers/product.controller.js";
import z from "zod";

const productRout = Router();
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

const pageSchema = z.object({
  query: z.object({
    page: z.string(),
  }),
});

productRout.post(
  "/create",
  authenticate,
  validate(createProductSchema),
  authorizeRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OFFICER),
  productController.createProduct
);
