import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import * as categoryController from "../controllers/category.controller.js";

const categoryRouter = Router();

categoryRouter.post(
  "/create-category",
  authenticate,
  categoryController.createCategoryHandler
);
categoryRouter.get(
  "/get-all-categories",
  authenticate,
  categoryController.getAllCategoriesHandler
);
categoryRouter.get(
  "/get-category",
  authenticate,
  categoryController.getCategoryByIdHandler
);
categoryRouter.put(
  "/update-category",
  authenticate,
  categoryController.updateCategoryHandler
);
categoryRouter.delete(
  "/delete-category",
  authenticate,
  categoryController.deleteCategoryHandler
);

export default categoryRouter;
