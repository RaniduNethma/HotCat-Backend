import { authResolvers } from './auth.resolver.js';
import { categoryResolvers } from './category.resolver.js';
import { orderResolvers } from './order.resolver.js';
import { priceListResolvers } from './priceList.resolver.js';
import { productResolvers } from './product.resolver.js';
import { tableResolvers } from './table.resolver.js';

export const resolvers = [
  authResolvers,
  categoryResolvers,
  productResolvers,
  tableResolvers,
  priceListResolvers,
  orderResolvers,
];
