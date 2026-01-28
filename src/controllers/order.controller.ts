import { AuthRequest } from "../types/types.js";
import { Response, NextFunction } from "express";
import { OrderService } from "../services/order.service.js";

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const order = await this.orderService.createOrder(req.body);

      return res.status(order.statusCode).json({
        success: order.success,
        message: order.message,
        data: order.data,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllOrders = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const page = req.query.page;
      const orders = await this.orderService.getAllOrders(Number(page));

      return res.status(orders.statusCode).json({
        success: orders.success,
        message: orders.message,
        data: orders.data,
      });
    } catch (error) {
      next(error);
    }
  };

  getOrderById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.query.orderId;
      const order = await this.orderService.getOrderById(Number(id));

      return res.status(order.statusCode).json({
        success: order.success,
        message: order.message,
        data: order.data,
      });
    } catch (error) {
      next(error);
    }
  };
}
