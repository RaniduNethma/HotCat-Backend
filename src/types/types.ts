import { Decimal } from "@prisma/client/runtime/library";
import { Request } from "express";

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  OFFICER = 'OFFICER',
  CASHIER = 'CASHIER',
  WAITER = 'WAITER',
  CHEF = 'CHEF',
  STORE_KEEPER = 'STORE_KEEPER',
  CUSTOMER = 'CUSTOMER'
}

enum ProfileType {
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  GOLD = 'GOLD'
}

enum TableType {
  INDOOR = 'INDOOR',
  OUTDOOR = 'OUTDOOR',
  VIP = 'VIP'
}

enum TableStatus {
  AVAILABLE = 'AVAILABLE',
  OCCUPIED = 'OCCUPIED',
  RESERVED = 'RESERVED',
  CLEANING = 'CLEANING',
  REPAIRING = 'REPAIRING'
}

enum OrderStatus {
  PENDING = 'PENDING',
  PREPARING = 'PREPARING',
  READY = 'READY',
  SERVED = 'SERVED'
}

enum OrderType {
  DINE_IN = 'DINE_IN',
  TAKEAWAY = 'TAKEAWAY',
  DELIVERY = 'DELIVERY'
}

enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  REFUNDED = 'REFUNDED'
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    userName: string;
    email?: string;
    userRole: UserRole;
    profileType: ProfileType;
  };
}

export interface TokenPayload {
  id: string;
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
}

export interface LoginDTO {
  userName: string;
  password: string;
}