import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/token", authController.refreshToken);
authRouter.post("/logout", auth(), authController.logout);

export default authRouter;
