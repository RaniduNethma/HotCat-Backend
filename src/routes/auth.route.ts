import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/signup", authController.signup);
authRouter.post("/login", authController.login);
authRouter.post("/token", authController.refreshToken);
authRouter.post("/logout", authController.logoutController);

export default authRouter;
