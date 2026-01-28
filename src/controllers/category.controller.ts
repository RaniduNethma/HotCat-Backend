import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/types.js";
import { CategoryService } from "../services/category.services.js";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  createCategory = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const category = await this.categoryService.createCategory(req.body);

      return res.status(category.statusCode).json({
        success: category.success,
        message: category.message,
        data: category.data,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllCategories = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const page = req.query.page;
      const categories = await this.categoryService.getAllCategories(
        Number(page),
      );

      return res.status(categories.statusCode).json({
        success: categories.success,
        message: categories.message,
        data: categories.data,
      });
    } catch (error) {
      next(error);
    }
  };

  getCategoryById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.query.categoryId;
      const category = await this.categoryService.getCategoryById(Number(id));

      return res.status(category.statusCode).json({
        success: category.success,
        message: category.message,
        data: category.data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateCategory = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const category = await this.categoryService.updateCategory(req.body);

      return res.status(category.statusCode).json({
        success: category.success,
        message: category.message,
        data: category.data,
      });
    } catch (error) {
      next(error);
    }
  };
}
