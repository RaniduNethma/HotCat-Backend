import DB from "../configs/dbConfig.js";
import { CreateCategoryDTO, UpdateCategoryDTO } from "../types/types.js";

export class CategoryService {
  async createCategory(data: CreateCategoryDTO) {
    const existingCategory = await DB.category.findUnique({
      where: { name: data.name },
    });

    if (existingCategory) {
      return {
        success: false,
        statusCode: 409,
        message: "Category name already exists",
        data: null,
      };
    }

    const newCategory = await DB.category.create({
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        sortOrder: true,
        isActive: true,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: "Create category successful",
      data: newCategory,
    };
  }

  async getAllCategories(page: number) {
    const limit: number = 10;
    const skip: number = (page - 1) * limit;

    const allCategories = await DB.category.findMany({
      take: limit,
      skip,
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        sortOrder: true,
        isActive: true,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: null,
      data: allCategories,
    };
  }

  async getCategoryById(id: number) {
    const getCategory = await DB.category.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        sortOrder: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (getCategory == null) {
      return {
        success: false,
        statusCode: 404,
        message: `Category with id ${id} not found`,
        data: null,
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: null,
      data: getCategory,
    };
  }

  async updateCategory(data: UpdateCategoryDTO) {
    if (!data.id) {
      return {
        success: false,
        statusCode: 404,
        message: `Category with id ${data.id} not found`,
        data: null,
      };
    }

    const updatedCategory = await DB.category.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
      },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
        sortOrder: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: "Category data updated successfully",
      data: updatedCategory,
    };
  }
}
