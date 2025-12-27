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

  getProducts = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page;
      const products = await this.productService.getProducts(Number(page));

      return res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      next(error);
    }
  };

  availableProducts = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = req.query.page;
      const availableProducts = await this.productService.availableProducts(
        Number(page)
      );

      return res.status(200).json({
        success: true,
        data: availableProducts,
      });
    } catch (error) {
      next(error);
    }
  };

  productById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.body;
      const productById = await this.productService.productById(Number(id));

      return res.status(200).json({
        success: true,
        data: productById,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProducts = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const updatedProduct = await this.productService.updateProducts(req.body);

      return res.status(200).json({
        success: true,
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  };
}
