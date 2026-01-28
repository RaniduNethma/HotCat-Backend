import { Response, NextFunction } from "express";
import { TableService } from "../services/table.services.js";
import { AuthRequest } from "../types/types.js";

export class TableController {
  private tableService: TableService;

  constructor() {
    this.tableService = new TableService();
  }

  createTable = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const table = await this.tableService.createTable(req.body);

      return res.status(table.statusCode).json({
        success: table.success,
        message: table.message,
        data: table.data,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTables = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const page = req.query.page;
      const tables = await this.tableService.getAllTables(Number(page));
      console.log(req.query);

      return res.status(tables.statusCode).json({
        success: tables.success,
        message: tables.message,
        data: tables.data,
      });
    } catch (error) {
      next(error);
    }
  };

  getAvailableTables = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    const page = req.query.page;
    const tables = await this.tableService.getAvailableTables(Number(page));

    return res.status(tables.statusCode).json({
      success: tables.success,
      message: tables.message,
      data: tables.data,
    });
  };

  getTableById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.query.tableId;
      const table = await this.tableService.getTableById(Number(id));

      return res.status(table.statusCode).json({
        success: table.success,
        message: table.message,
        data: table.data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateTable = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const table = await this.tableService.updateTable(req.body);

      return res.status(table.statusCode).json({
        success: table.success,
        message: table.message,
        data: table.data,
      });
    } catch (error) {
      next(error);
    }
  };
}
