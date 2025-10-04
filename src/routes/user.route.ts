import { Router} from "express";
import * as userController from '../controllers/user.controller.js';

const userRouter = Router();

userRouter.post('/register', userController.userRegisterController);

export default userRouter;
