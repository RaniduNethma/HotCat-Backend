import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/all-users', auth(), userController.getAllUsersHandler);
userRouter.get('/user', auth(), userController.getUserHandler);

export default userRouter;