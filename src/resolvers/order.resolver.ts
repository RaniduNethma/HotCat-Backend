import { AuthContext } from '../context.js';
import { OrderService } from '../services/order.service.js';
import { CreateOrderDTO } from '../types/types.js';
import { checkRole } from '../utils/auth.util.js';
import { pubsub } from '../utils/pubsub.utils.js';

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
      const order = await orderService.createOrder(args.input);

      if (order.success) {
        pubsub.publish('ORDER_CREATED', { orderCreated: order });
      }

      return order;
    },

    deleteOrder: async (_: any, args: { id: number }, context: AuthContext) => {
      checkRole(context.user, ['OFFICER', 'MANAGER', 'ADMIN']);
      return await orderService.deleteOrder(args.id);
    },
  },

  Subscription: {
    orderCreated: {
      subscribe: () => pubsub.asyncIterableIterator(['ORDER_CREATED']),
    },
  },
};
