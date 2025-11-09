import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.get('/all-users', auth(), userController.getAllUsersHandler);
userRouter.get('/', auth(), userController.getUserHandler);
userRouter.put('/update-user', auth(), userController.updateUserHandler);

export default userRouter;