import { Request } from "express";
import {
  UserRole,
  ProfileType,
  TableType,
  TableStatus,
  OrderStatus,
  OrderType,
  PaymentStatus,
} from "../generated/prisma/client.js";
import { Decimal } from "@prisma/client/runtime/client";

export interface EnvConfig {
  NODE_ENV: string;
  SERVER_PORT: number;
  DATABASE_URL: string;
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  ACCESS_TOKEN_EXPIRES: number;
  REFRESH_TOKEN_EXPIRES: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  CLIENT_URL: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    userName: string;
    email?: string;
    userRole: UserRole;
    profileType: ProfileType;
  };
}

export interface TokenPayload {
  id: number;
  userName: string;
  userRole: UserRole;
  profileType: ProfileType;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterDTO {
  userName: string;
  name: string;
  phone: string;
  email?: string;
  password: string;
  dateOfBirth?: Date;
  userRole: UserRole;
  profileType: ProfileType;
  address?: string;
  city?: string;
  priceListId?: number | null;
}

export interface LoginDTO {
  userName: string;
  password: string;
}

export interface CreateTableDTO {
  tableNumber: number;
  capacity: number;
  tableType: TableType;
  tableStatus: TableStatus;
  qrCode: string;
  isActive: boolean;
}

export interface UpdateTableDTO {
  id: number;
  tableNumber: number;
  capacity: number;
  tableType: TableType;
  tableStatus: TableStatus;
  qrCode: string;
  isActive: boolean;
}

export interface CreateCategoryDTO {
  name: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}

export interface UpdateCategoryDTO {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
  stock: number;
  categoryId: number;
}

export interface UpdateProductDTO {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
  stock: number;
  categoryId: number;
}

export interface PriceListItemsDTO {
  productId: number;
  price: Decimal;
}

export interface CreatePriceListDTO {
  name: string;
  description: string;
  isActive: boolean;
  isDefault: boolean;
  startDate: Date;
  endDate: Date;
  items: PriceListItemsDTO[];
}

export interface UpdatePriceListDTO {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  isDefault: boolean;
  startDate: Date;
  endDate: Date;
  items: PriceListItemsDTO[];
}

export interface OrderItemsDTO {
  productId: number;
  Quantity: number;
  unitPrice: number;
  subTotal: number;
  orderStatus: OrderStatus;
}

export interface CreateOrderDTO {
  userId: number;
  tableId: number;
  assignedToId: number;
  orderStatus: OrderStatus;
  orderType: OrderType;
  subTotal: Decimal;
  discount: Decimal;
  totalAmount: Decimal;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  completedAt: Date;
  orderItems: OrderItemsDTO[];
}

export interface SocketUser {
  userId: string;
  role: string;
  socketId: string;
}
