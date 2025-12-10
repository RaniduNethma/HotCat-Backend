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
        data: tables
      });
    } catch (error) {
      next(error);
  }

  getTableByIdHandler = async (req: Request, res: Response) => {
    const id = req.body;

    try {
      const { statusCode, message, data } =
        await tableServices.getTableById(id);

      return res.status(statusCode).json({ message, data });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        return res
          .status(400)
          .json({ error: "Error executing query", message: errorMessage });
      }
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  };

  updateTableHandler = async (req: Request, res: Response) => {
    const { id, newTableNumber, newStatus } = req.body;

    try {
      const { statusCode, message, data } = await tableServices.updateTable(
        id,
        newTableNumber,
        newStatus
      );

      return res.status(statusCode).json({ message, data });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        return res
          .status(400)
          .json({ error: "Error executing query", message: errorMessage });
      }
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  };

  deleteTablHandler = async (req: Request, res: Response) => {
    const { id } = req.body;

    try {
      const { statusCode, message } = await tableServices.deleteTable(id);

      return res.status(statusCode).json({ message });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        const errorMessage = error.message;
        return res
          .status(400)
          .json({ error: "Error executing query", message: errorMessage });
      }
      return res
        .status(500)
        .json({ error: "Internal server error", message: error });
    }
  };
}
