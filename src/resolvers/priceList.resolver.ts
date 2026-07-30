import { AuthContext } from '../context.js';
import { PriceListService } from '../services/priceList.service.js';
import { CreatePriceListDTO, UpdatePriceListDTO } from '../types/types.js';
import { checkRole } from '../utils/auth.util.js';

const priceListService = new PriceListService();

export const priceListResolvers = {
  Query: {
    allPriceLists: async (_: any, args: { page: number }, context: AuthContext) => {
      if (!context.user) throw new Error('Unauthorized! Please login.');
      return await priceListService.allPriceLists(args.page);
    },

    availablePriceLists: async (_: any, args: { page: number }, context: AuthContext) => {
      if (!context.user) throw new Error('Unauthorized! Please login.');
      return await priceListService.availablePriceLists(args.page);
    },

    priceListById: async (_: any, args: { id: number }, context: AuthContext) => {
      if (!context.user) throw new Error('Unauthorized! Please login.');
      return await priceListService.priceListById(args.id);
    },
  },

  Mutation: {
    createPriceList: async (_: any, args: { input: CreatePriceListDTO }, context: AuthContext) => {
      checkRole(context.user, ['ADMIN', 'MANAGER', 'OFFICER']);
      return await priceListService.createPriceList(args.input);
    },

    updatePriceList: async (_: any, args: { input: UpdatePriceListDTO }, context: AuthContext) => {
      checkRole(context.user, ['ADMIN', 'MANAGER', 'OFFICER']);
      return await priceListService.updatePriceList(args.input);
    },

    deletePriceList: async (_: any, args: { id: number }, context: AuthContext) => {
      checkRole(context.user, ['ADMIN', 'MANAGER', 'OFFICER']);
      return await priceListService.deletePriceList(args.id);
    },
  },
};
