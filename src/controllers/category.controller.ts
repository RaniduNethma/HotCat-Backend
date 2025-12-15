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
    next: NextFunction
  ) => {
    try {
      const category = await this.categoryService.createCategory(req.body);

      return res.status(201).json({
        success: true,
        data: category,
        message: "Category created successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllCategories = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = req.query.page;
      const categories = await this.categoryService.getAllCategories(
        Number(page)
      );

      return res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  };

  getCategoryById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.query.categoryId;
      const category = await this.categoryService.getCategoryById(Number(id));

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      return res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };

  updateCategory = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const category = await this.categoryService.updateCategory(req.body);

      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }

      return res.status(200).json({
        success: true,
        data: category,
      });
    } catch (error) {
      next(error);
    }
  };
}
