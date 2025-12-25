import { Response, NextFunction } from "express";
import { ProductService } from "../services/product.service.js";
import { AuthRequest } from "../types/types.js";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  createProduct = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const product = await this.productService.createProduct(req.body);

      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  };
}
