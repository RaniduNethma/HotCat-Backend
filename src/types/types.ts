import { Decimal } from "@prisma/client/runtime/library";
import { Request } from "express";

export enum UserType {
  CUSTOMER = "CUSTOMER",
  STAFF = "STAFF"
}

enum UserRole {
  ADMIN
  MANAGER
  OFFICER
  CASHIER
  WAITER
  CHEF
  STORE_KEEPER
}

enum ProfileType {
  BRONZE
  SILVER
  GOLD
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: UserRole;
    profileType: ProfileType;
  };
}

export enum ProfileType {
  BRONZE = "BRONZE",
  SILVER = "SILVER",
  GOLD = "GOLD",
}

export enum Role {
  USER = "USER",
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
