import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.post("/create", authenticate, orderController.createOrder);

export default orderRouter;
