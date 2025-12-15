import DB from "../configs/dbConfig.js";
import { CreateCategoryDTO } from "../types/types.js";

export class CategoryService {
  async createCategory(data: CreateCategoryDTO) {
    const existingCategory = await DB.category.findUnique({
      where: { name: data.name },
    });

    if (existingCategory) {
      return {
        statusCode: 409,
        message: "Category name already exists",
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
      statusCode: 200,
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
        statusCode: 404,
        message: `Category with id ${id} not found`,
      };
    }

    return {
      statusCode: 200,
      data: getCategory,
    };
  }

  async updateCategory(id: number, newName: string, newDescription: string) {
    await DB.category.update({
      where: { id },
      data: {
        name: newName,
        description: newDescription,
      },
    });

    const updatedCategory = await DB.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
      },
    });

    if (updatedCategory == null) {
      return {
        statusCode: 404,
        message: `Category with id ${id} not found`,
      };
    }

    return {
      statusCode: 200,
      message: "Category data updated successfully",
      data: updatedCategory,
    };
  }
}
