import { Response, NextFunction } from "express";
import { TableService } from "../services/table.services.js";
import { AuthRequest } from "../types/types.js";

export class TableController {
  private tableService: TableService;

  constructor() {
    this.tableService = new TableService();
  }

  async createTable(req: AuthRequest, res: Response, next: NextFunction) {
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
  }

  async getAllTables(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const tables = await this.tableService.getAllTables(req.body);

      return res.status(200).json({
        success: true,
        data: tables,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAvailableTables(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    const tables = await this.tableService.getAvailableTables();

    return res.status(200).json({
      success: true,
      data: tables,
    });
  }

  async getTableById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const table = await this.tableService.getTableById(req.body);

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
