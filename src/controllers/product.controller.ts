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
    next: NextFunction,
  ) => {
    try {
      const product = await this.productService.createProduct(req.body);

      return res.status(product.statusCode).json({
        success: product.success,
        message: product.message,
        data: product.data,
      });
    } catch (error) {
      next(error);
    }
  };

  getProducts = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page;
      const products = await this.productService.getProducts(Number(page));

      return res.status(products.statusCode).json({
        success: products.success,
        message: products.message,
        data: products.data,
      });
    } catch (error) {
      next(error);
    }
  };

  availableProducts = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const page = req.query.page;
      const availableProducts = await this.productService.availableProducts(
        Number(page),
      );

      return res.status(availableProducts.statusCode).json({
        success: availableProducts.success,
        message: availableProducts.message,
        data: availableProducts.data,
      });
    } catch (error) {
      next(error);
    }
  };

  productById = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.query.id;
      const productById = await this.productService.productById(Number(id));

      return res.status(productById.statusCode).json({
        success: productById.success,
        message: productById.message,
        data: productById.data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateProducts = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const updatedProduct = await this.productService.updateProducts(req.body);

      return res.status(updatedProduct.statusCode).json({
        success: updatedProduct.success,
        message: updatedProduct.message,
        data: updatedProduct.data,
      });
    } catch (error) {
      next(error);
    }
  };
}
