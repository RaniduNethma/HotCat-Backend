import { CategoryService } from '../services/category.services.js';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../types/types.js';
import { checkRole } from '../utils/auth.util.js';
import { AuthContext } from '../context.js';

const categoryService = new CategoryService();

export const categoryResolvers = {
  Query: {
    getAllCategories: async (_: any, args: { page: number }) => {
      return await categoryService.getAllCategories(args.page);
    },

    getCategoryById: async (_: any, args: { id: number }) => {
      return await categoryService.getCategoryById(args.id);
    },
  },

  Mutation: {
    createCategory: async (_: any, args: { input: CreateCategoryDTO }, context: AuthContext) => {
      checkRole(context.user, ['ADMIN', 'MANAGER']);
      return await categoryService.createCategory(args.input);
    },

    updateCategory: async (_: any, args: { input: UpdateCategoryDTO }, context: AuthContext) => {
      checkRole(context.user, ['ADMIN', 'MANAGER']);
      return await categoryService.updateCategory(args.input);
    },

    deleteCategory: async (_: any, args: { id: number }, context: AuthContext) => {
      checkRole(context.user, ['ADMIN', 'MANAGER']);
      return await categoryService.deleteCategory(args.id);
    },
  },
};
