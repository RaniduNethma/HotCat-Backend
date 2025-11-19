import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import * as categoryController from '../controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.post('/create-category', auth(), categoryController.createCategoryHandler);
categoryRouter.get('/get-all-categories', auth(), categoryController.getAllCategoriesHandler);
categoryRouter.get('/get-category', auth(), categoryController.getCategoryByIdHandler);
categoryRouter.put('/update-category', auth(), categoryController.updateCategoryHandler);

export default categoryRouter;