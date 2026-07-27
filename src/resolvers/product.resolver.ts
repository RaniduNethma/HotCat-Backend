import { AuthContext } from '../context.js';
import { ProductService } from '../services/product.service.js';
import { CreateProductDTO, UpdateProductDTO } from '../types/types.js';
import { checkRole } from '../utils/auth.util.js';

const productService = new ProductService();

export const productResolvers = {
  Query: {
    getProducts: async (_: any, args: { page: number }, context: AuthContext) => {
      if (!context.user) throw new Error('Unauthorized! Please login.');
      return await productService.getProducts(args.page);
    },

    availableProducts: async (_: any, args: { page: number }, context: AuthContext) => {
      if (!context.user) throw new Error('Unauthorized! Please login.');
      return await productService.availableProducts(args.page);
    },

    productById: async (_: any, args: { id: number }, context: AuthContext) => {
      if (!context.user) throw new Error('Unauthorized! Please login.');
      return await productService.productById(args.id);
    },
  },

  Mutation: {
    createProduct: async (_: any, args: { input: CreateProductDTO }, context: AuthContext) => {
      checkRole(context.user, ['ADMIN', 'MANAGER', 'OFFICER']);
      return await productService.createProduct(args.input);
    },

    updateProduct: async (_: any, args: { input: UpdateProductDTO }, context: AuthContext) => {
      checkRole(context.user, ['ADMIN', 'MANAGER', 'OFFICER']);
      return await productService.updateProducts(args.input);
    },
  },
};
