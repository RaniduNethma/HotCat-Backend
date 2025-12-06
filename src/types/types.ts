import { Decimal } from "@prisma/client/runtime/library";
import { Request } from "express";

enum UserRole {
  ADMIN,
  MANAGER,
  OFFICER,
  CASHIER,
  WAITER,
  CHEF,
  STORE_KEEPER,
  CUSTOMER
}

enum ProfileType {
  BRONZE,
  SILVER,
  GOLD
}

enum TableType {
  INDOOR,
  OUTDOOR,
  VIP
}

enum TableStatus {
  AVAILABLE,
  OCCUPIED,
  RESERVED,
  CLEANING,
  REPAIRING
}

enum OrderStatus {
  PENDING,
  PREPARING,
  READY,
  SERVED
}

enum OrderType {
  DINE_IN,
  TAKEAWAY,
  DELIVERY
}

enum PaymentStatus {
  PENDING,
  PAID,
  PARTIALLY_PAID,
  REFUNDED
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    userName: string;
    email?: string;
    userRole?: UserRole;
    profileType: ProfileType;
  };
}

export interface TokenPayload {
  id: string;
  userName: string;
  userRole?: UserRole;
  profileType: ProfileType;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterDTO {
  userName: String;
  name: String;
  phone?: String;
  email?: String;
  password: String;
  dateOfBirth?: Date;
  userRole: UserRole;
}

export interface LoginDTO {
  userName: string;
  password: string;
}