import DB from "../configs/dbConfig.js";
import { CreateProductDTO, UpdateProductDTO } from "../types/types.js";

export class ProductService {
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

    if (!category) {
      return {
        statusCode: 400,
        message: "Category is Inactive",
      };
    }

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

  async getProducts(page: number) {
    const limit: number = 10;
    const skip: number = (page - 1) * limit;

    const allProducts = await DB.product.findMany({
      take: limit,
      skip,
      include: {
        category: {},
      },
    });

    return {
      statusCode: 200,
      data: allProducts,
    };
  }

  async availableProducts(page: number) {
    const limit: number = 10;
    const skip: number = (page - 1) * limit;

    const availableProducts = await DB.product.findMany({
      take: limit,
      skip,
      where: { isActive: true },
      include: {
        category: {},
      },
    });

    return {
      statusCode: 200,
      data: availableProducts,
    };
  }

  async updateProducts(data: UpdateProductDTO) {
    if (!data.id) {
      return {
        statusCode: 404,
        message: `Product with id ${data.id} not found`,
      };
    }

    if (!data.categoryId) {
      return {
        statusCode: 404,
        message: `category with id ${data.id} not found`,
      };
    }

    const category = await DB.category.findUnique({
      where: { id: data.categoryId, isActive: true },
    });

    if (!category) {
      return {
        statusCode: 400,
        message: "Category is Inactive",
      };
    }

    const updatedProduct = await DB.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
        stock: data.stock,
        categoryId: data.categoryId,
      },
      include: {
        category: {},
      },
    });

    return {
      statusCode: 200,
      message: "Product data updated successfully",
      data: updatedProduct,
    };
  }
}
