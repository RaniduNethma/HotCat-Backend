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
    userId: z.number().optional(),
    tableId: z.number().optional(),
    assignedToId: z.number().optional(),
    orderStatus: z.enum(["PENDING", "PREPARING", "READY", "SERVED"]),
    orderType: z.enum(["DINE_IN", "TAKEAWAY", "DELIVERY"]),
    discount: z.number().optional(),
    paymentStatus: z.enum(["PENDING", "PAID", "PARTIALLY_PAID", "REFUNDED"]),
    paymentMethod: z.string().optional(),
    completedAt: z.date().optional(),
    orderItems: z.array(orderItemsSchema),
  }),
});

const pageSchema = z.object({
  query: z.object({
    page: z.string(),
  }),
});

const orderIdSchema = z.object({
  query: z.object({
    orderId: z.string(),
  }),
});

orderRouter.post(
  "/create",
  authenticate,
  validate(createOrderSchema),
  orderController.createOrder,
);

orderRouter.get(
  "/",
  authenticate,
  validate(pageSchema),
  orderController.getAllOrders,
);

orderRouter.get(
  "/id",
  authenticate,
  validate(orderIdSchema),
  orderController.getOrderById,
);

export default orderRouter;
