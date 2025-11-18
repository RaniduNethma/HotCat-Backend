import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import * as categoryController from '../controllers/category.controller.js';

const categoryRouter = Router();

categoryRouter.post('/create-category', auth(), categoryController.createCategoryHandler);

export default categoryRouter;