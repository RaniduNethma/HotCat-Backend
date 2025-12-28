import { Response, NextFunction } from "express";
import { PriceListService } from "../services/priceList.service.js";
import { AuthRequest } from "../types/types.js";

export class PriceListController {
  private priceListService: PriceListService;

  constructor() {
    this.priceListService = new PriceListService();
  }

  createPriceList = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const priceList = await this.priceListService.createPriceList(req.body);

      return res.status(200).json({
        success: true,
        message: "PriceList created successfully",
        data: priceList,
      });
    } catch (error) {
      next(error);
    }
  };
}
