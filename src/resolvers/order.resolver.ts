import { AuthContext } from '../context.js';
import { OrderService } from '../services/order.service.js';
import { CreateOrderDTO } from '../types/types.js';
import { checkRole } from '../utils/auth.util.js';

const orderService = new OrderService();

export const orderResolvers = {
  Query: {
    getAllOrders: async (_: any, args: { page: number }, context: AuthContext) => {
      if (!context.user) throw new Error('Unauthorized! Please login.');
      return await orderService.getAllOrders(args.page);
    },

    getOrderById: async (_: any, args: { id: number }, context: AuthContext) => {
      if (!context.user) throw new Error('Unauthorized! Please login.');
      return await orderService.getOrderById(args.id);
    },
  },

  Mutation: {
    createOrder: async (_: any, args: { input: CreateOrderDTO }, context: AuthContext) => {
      checkRole(context.user, ['WAITER', 'CASHIER', 'OFFICER', 'MANAGER', 'ADMIN']);
      return await orderService.createOrder(args.input);
    },

    deleteOrder: async (_: any, args: { id: number }, context: AuthContext) => {
      checkRole(context.user, ['OFFICER', 'MANAGER', 'ADMIN']);
      return await orderService.deleteOrder(args.id);
    },
  },
};
