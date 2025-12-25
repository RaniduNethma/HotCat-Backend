import DB from "../configs/dbConfig.js";
import { CreateProductDTO } from "../types/types.js";

export class productService {
  async createProduct(data: CreateProductDTO) {
    const existingProduct = await DB.product.findUnique({
      where: { name: data.name },
    });

    if (existingProduct) {
      return {
        statusCode: 409,
        message: "Product name already exists",
      };
    }

    const category = await DB.category.findUnique({
      where: { id: data.categoryId, isActive: true },
    });

    const newProduct = await DB.product.create({
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
        stock: data.stock,
        categoryId: data.categoryId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        sortOrder: true,
        isActive: true,
        stock: true,
        categoryId: true,
      },
    });

    return {
      statusCode: 200,
      message: "Create product successful",
      data: newProduct,
    };
  }
}
