import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import * as tableController from "../controllers/table.controller.js";

const tableRouter = Router();

tableRouter.post(
  "/create-table",
  authenticate,
  tableController.createTableHandler
);
tableRouter.get(
  "/all-tables",
  authenticate,
  tableController.getAllTablesHandler
);
tableRouter.get(
  "/get-table-by-id",
  authenticate,
  tableController.getTableByIdHandler
);
tableRouter.put(
  "/update-table",
  authenticate,
  tableController.updateTableHandler
);
tableRouter.delete(
  "/delete-table",
  authenticate,
  tableController.deleteTablHandler
);

export default tableRouter;
