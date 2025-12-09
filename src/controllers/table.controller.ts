import { Request, Response } from "express";
import * as tableServices from "../services/table.services.js";

export const createTableHandler = async (req: Request, res: Response) => {
  const { tableNumber, tableType, capacity, tableStatus, qrCode, isActive } =
    req.body;

  try {
    const { statusCode, message, data } = await tableServices.createTable(
      tableNumber,
      tableType,
      capacity,
      tableStatus,
      qrCode,
      isActive
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

export const getAllTablesHandler = async (req: Request, res: Response) => {
  const page = req.body;

  try {
    const { statusCode, data } = await tableServices.getAllTables(page);

    return res.status(statusCode).json({ data });
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

export const getTableByIdHandler = async (req: Request, res: Response) => {
  const id = req.body;

  try {
    const { statusCode, message, data } = await tableServices.getTableById(id);

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

export const updateTableHandler = async (req: Request, res: Response) => {
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

export const deleteTablHandler = async (req: Request, res: Response) => {
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
