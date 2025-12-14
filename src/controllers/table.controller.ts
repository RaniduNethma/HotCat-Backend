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

      return res.status(201).json({
        success: true,
        data: table,
        message: "Table created successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  getAllTables = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = req.query.page;
      const tables = await this.tableService.getAllTables(Number(page));
      console.log(req.query);

      return res.status(200).json({
        success: true,
        data: tables,
      });
    } catch (error) {
      next(error);
    }
  };

  getAvailableTables = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const page = req.query.page;
    const tables = await this.tableService.getAvailableTables(Number(page));

    return res.status(200).json({
      success: true,
      data: tables,
    });
  };

  getTableById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.query.tableId;
      const table = await this.tableService.getTableById(Number(id));

      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }

      return res.status(200).json({
        success: true,
        data: table,
      });
    } catch (error) {
      next(error);
    }
  };

  async updateTable(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const table = await this.tableService.updateTable(req.body);

      if (!table) {
        return res.status(404).json({ error: "Table not found" });
      }

      return res.status(200).json({
        success: true,
        data: table,
      });
    } catch (error) {
      next(error);
    }
  }
}
