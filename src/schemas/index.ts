import { authTypeDefs } from './auth.schema.js';
import { categoryTypeDefs } from './category.schema.js';
import { orderTypeDefs } from './order.schema.js';
import { priceListTypeDefs } from './priceList.schema.js';
import { productTypeDefs } from './product.schema.js';
import { tableTypeDefs } from './table.schema.js';

export const typeDefs = [
  authTypeDefs,
  categoryTypeDefs,
  productTypeDefs,
  tableTypeDefs,
  priceListTypeDefs,
  orderTypeDefs,
];
