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

  allPriceLists = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = req.params.id;
      const allPriceLists = await this.priceListService.allPriceLists(
        Number(page)
      );

      return res.status(200).json({
        success: true,
        data: allPriceLists,
      });
    } catch (error) {
      next(error);
    }
  };

  availablePriceLists = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = req.params.id;
      const availablePriceLists =
        await this.priceListService.availablePriceLists(Number(page));

      return res.status(200).json({
        success: true,
        data: availablePriceLists,
      });
    } catch (error) {
      next(error);
    }
  };

  priceListById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id;
      const priceListById = await this.priceListService.priceListById(
        Number(id)
      );

      return res.status(200).json({
        success: true,
        data: priceListById,
      });
    } catch (error) {
      next(error);
    }
  };
}
