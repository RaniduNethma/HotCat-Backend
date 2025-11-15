import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import * as tableController from '../controllers/table.controller.js'

const tableRouter = Router();

tableRouter.post('/create-table', auth(), tableController.createTableHandler);
tableRouter.get('/all-tables', auth(), tableController.getAllTablesHandler);
tableRouter.get('/get-table-by-id', auth(), tableController.getTableByIdHandler);
tableRouter.put('/update-table', auth(), tableController.updateTableHandler);

export default tableRouter;