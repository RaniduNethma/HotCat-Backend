import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
//import { authorizeRoles } from "../middlewares/authorize.middleware.js";
import { z } from "zod";

const authRouter = Router();
const authController = new AuthController();

const registerSchema = z.object({
    userName: z.string().min(3),
    name: z.string().min(3),
    phone: z.string(),
    email: z.string().optional(),
    dateOfBirth: z.date().optional(),
    userRole: z.enum(['ADMIN', 'MANAGER', 'OFFICER', 'CASHIER', 'WAITER', 'CHEF', 'STORE_KEEPER', 'CUSTOMER']),
    password: z.string().min(6),
    profileType: z.enum(['BRONZE', 'SILVER', 'GOLD']),
    address: z.string().min(3).optional(),
    city: z.string().optional()
});

const loginSchema = z.object({
    userName: z.string().min(3),
    password: z.string().min(6)
});

authRouter.post('/register', validate(registerSchema), authController.register);
authRouter.post('/login', validate(loginSchema), authController.login);
authRouter.post('/token', authenticate, authController.refreshToken);
authRouter.post('/logout', authenticate, authController.logout);
authRouter.get('/profile', authenticate, authController.getProfile);

export default authRouter;
