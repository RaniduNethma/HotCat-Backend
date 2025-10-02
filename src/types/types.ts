import { Decimal } from "@prisma/client/runtime/library";
import DB from "../configs/dbConfig.js";

export enum ProfileType {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
}

export enum Role {
  WAITER = "WAITER",
  CHEF = "CHEF",
  STORE_KEEPER = "STORE_KEEPER",
  OFFICER = "OFFICER",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
}

export enum TableStatus {
  FREE = "FREE",
  BUSY = "BUSY",
}

export enum OrderStatus {
  PENDING = "PENDING",
  COOKING = "COOKING",
  READY = "READY",
  DELIVERED = "DELIVERED",
}

export type User = {
  id: number;
  userName: string;
  name: string;
  phone: string;
  email?: string | null;
  password: string;
  dateOfBirth?: Date | null;
  profileType: ProfileType;
  createdAt: Date;
  order: Order[];
};

export type Staff = {
  id: number;
  userName: string;
  name: string;
  phone: string;
  email?: string | null;
  password: string;
  role: Role;
  createdAt: Date;
  order: Order[];
};

export type Table = {
  id: number;
  tableNumber: number;
  status: TableStatus;
  order: Order[];
};

export type Product = {
  id: number;
  name: string;
  description?: string | null;
  categoryId: number;
  stock: number;
  createdAt: Date;
  priceListItems: PriceListItems[];
  orderItems: OrderItems[];
};

export type Category = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  product: Product[];
};

export type PriceList = {
  id: number;
  name: string;
  description?: string | null;
  createdAt: Date;
  priceListItems: PriceListItems[];
};

export type PriceListItems = {
  id: number;
  productId: number;
  priceListId: number;
  price: Decimal;
};

export type Order = {
  id: number;
  UserId?: number | null;
  staffId?: number | null;
  tableId?: number | null;
  totalDiscount?: Decimal | null;
  totalPrice: Decimal;
  status: OrderStatus;
  createdAt: Date;
  orderItems: OrderItems[];
};

export type OrderItems = {
  id: number;
  orderId: number;
  productId: number;
  Quantity: number;
  subTotal: Decimal;
};
