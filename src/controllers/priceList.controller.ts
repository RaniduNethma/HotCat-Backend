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
    next: NextFunction,
  ) => {
    try {
      const priceList = await this.priceListService.createPriceList(req.body);

      return res.status(priceList.statusCode).json({
        success: priceList.success,
        message: priceList.message,
        data: priceList.data,
      });
    } catch (error) {
      next(error);
    }
  };

  allPriceLists = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const page = req.params.page;
      const allPriceLists = await this.priceListService.allPriceLists(
        Number(page),
      );

      return res.status(allPriceLists.statusCode).json({
        success: allPriceLists.success,
        message: allPriceLists.message,
        data: allPriceLists.data,
      });
    } catch (error) {
      next(error);
    }
  };

  availablePriceLists = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const page = req.params.page;
      const availablePriceLists =
        await this.priceListService.availablePriceLists(Number(page));

      return res.status(availablePriceLists.statusCode).json({
        success: availablePriceLists.success,
        message: availablePriceLists.message,
        data: availablePriceLists.data,
      });
    } catch (error) {
      next(error);
    }
  };

  priceListById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.query.id;
      const priceListById = await this.priceListService.priceListById(
        Number(id),
      );

      return res.status(priceListById.statusCode).json({
        success: priceListById.success,
        message: priceListById.message,
        data: priceListById.data,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePriceList = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const updatePriceList = await this.priceListService.updatePriceList(
        req.body,
      );

      return res.status(updatePriceList.statusCode).json({
        success: updatePriceList.success,
        message: updatePriceList.message,
        data: updatePriceList.data,
      });
    } catch (error) {
      next(error);
    }
  };
}
