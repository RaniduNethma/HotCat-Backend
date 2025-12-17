import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { CategoryController } from "../controllers/category.controller.js";
import { UserRole } from "../generated/prisma/client.js";
import { validate } from "../middlewares/validation.middleware.js";
import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import z from "zod";

const categoryRouter = Router();
const categoryController = new CategoryController();

const createCategorySchema = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    sortOrder: z.number(),
    isActive: z.boolean(),
  }),
});

const updateCategorySchema = z.object({
  body: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    sortOrder: z.number(),
    isActive: z.boolean(),
  }),
});

const pageSchema = z.object({
  query: z.object({
    page: z.string(),
  }),
});

const categoryIdSchema = z.object({
  query: z.object({
    categoryId: z.string(),
  }),
});

categoryRouter.post(
  "/create",
  authenticate,
  validate(createCategorySchema),
  authorizeRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OFFICER),
  categoryController.createCategory
);

categoryRouter.get(
  "/",
  authenticate,
  validate(pageSchema),
  categoryController.getAllCategories
);

categoryRouter.get(
  "/id",
  authenticate,
  validate(categoryIdSchema),
  categoryController.getCategoryById
);

categoryRouter.put(
  "/update",
  authenticate,
  validate(updateCategorySchema),
  authorizeRoles(UserRole.ADMIN, UserRole.MANAGER, UserRole.OFFICER),
  categoryController.updateCategory
);

export default categoryRouter;
