import { authResolvers } from './auth.resolver.js';
import { categoryResolvers } from './category.resolver.js';
import { productResolvers } from './product.resolver.js';
import { tableResolvers } from './table.resolver.js';

export const resolvers = [authResolvers, categoryResolvers, productResolvers, tableResolvers];
