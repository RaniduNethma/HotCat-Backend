import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import z from "zod";
import { validate } from "../middlewares/validation.middleware.js";

const orderRouter = Router();
const orderController = new OrderController();

const orderItemsSchema = z.object({
  productId: z.number(),
  Quantity: z.number(),
  orderStatus: z.enum(["PENDING", "PREPARING", "READY", "SERVED"]),
});

const createOrderSchema = z.object({
  body: z.object({
    userId: z.number(),
    tableId: z.number(),
    assignedToId: z.number(),
    orderStatus: z.enum(["PENDING", "PREPARING", "READY", "SERVED"]),
    orderType: z.enum(["DINE_IN", "TAKEAWAY", "DELIVERY"]),
    discount: z.number(),
    paymentStatus: z.enum(["PENDING", "PAID", "PARTIALLY_PAID", "REFUNDED"]),
    paymentMethod: z.string(),
    completedAt: z.date(),
    orderItems: z.array(orderItemsSchema),
  }),
});

orderRouter.post(
  "/create",
  authenticate,
  validate(createOrderSchema),
  orderController.createOrder
);

export default orderRouter;
