import { Request } from "express";
import {
  UserRole,
  ProfileType,
  TableType,
  TableStatus,
  OrderStatus,
  OrderType,
  PaymentStatus,
} from "@prisma/client";

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
