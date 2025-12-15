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

  getAllCategoriesHandler = async (req: Request, res: Response) => {
    const page = req.body;

    try {
      const { statusCode, message, data } =
        await categoryServices.getAllCategories(page);

      return res.status(statusCode).json({ message, data });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        return res
          .status(400)
          .json({ error: "Error executing query", message: errorMessage });
      }
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  };

  getCategoryByIdHandler = async (req: Request, res: Response) => {
    const id = req.body;

    try {
      const { statusCode, message, data } =
        await categoryServices.getCategoryById(Number(id));

      return res.status(statusCode).json({ message, data });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        return res
          .status(400)
          .json({ error: "Error executing query", message: errorMessage });
      }
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  };

  updateCategoryHandler = async (req: Request, res: Response) => {
    const { id, newName, newDescription } = req.body;

    try {
      const { statusCode, message, data } =
        await categoryServices.updateCategory(
          Number(id),
          newName,
          newDescription
        );

      return res.status(statusCode).json({ message, data });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        return res
          .status(400)
          .json({ error: "Error executing query", message: errorMessage });
      }
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  };

  deleteCategoryHandler = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      const { statusCode, message } = await categoryServices.deleteCategory(
        Number(id)
      );

      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        return res
          .status(400)
          .json({ error: "Error executing query", message: errorMessage });
      }
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  };
}
