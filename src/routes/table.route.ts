import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import * as tableController from '../controllers/table.controller.js'

const tableRouter = Router();

tableRouter.post('/create-table', auth(), tableController.createTableHandler);

export default tableRouter;