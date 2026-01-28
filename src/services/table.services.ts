import DB from "../configs/dbConfig.js";
import { CreateTableDTO, UpdateTableDTO } from "../types/types.js";

export class TableService {
  async createTable(data: CreateTableDTO) {
    const existingTable = await DB.table.findUnique({
      where: { tableNumber: data.tableNumber },
    });

    if (existingTable) {
      return {
        success: false,
        statusCode: 409,
        message: "Table number already exists",
        data: null,
      };
    }

    const newTable = await DB.table.create({
      data: {
        tableNumber: data.tableNumber,
        capacity: data.capacity,
        tableType: data.tableType,
        tableStatus: data.tableStatus,
        qrCode: data.qrCode,
        isActive: data.isActive,
      },
      select: {
        id: true,
        tableNumber: true,
        capacity: true,
        tableType: true,
        tableStatus: true,
        qrCode: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: "Create table successful",
      data: newTable,
    };
  }

  async getAllTables(page: number) {
    const limit: number = 10;
    const skip: number = page > 1 ? (page - 1) * limit : 0;

    const allTables = await DB.table.findMany({
      take: limit,
      select: {
        id: true,
        tableNumber: true,
        capacity: true,
        tableType: true,
        tableStatus: true,
        qrCode: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
    });

    return {
      success: true,
      statusCode: 200,
      message: null,
      data: allTables,
    };
  }

  async getAvailableTables(page: number) {
    const limit: number = 10;
    const skip: number = page > 1 ? (page - 1) * limit : 0;

    const availableTables = await DB.table.findMany({
      take: limit,
      where: {
        isActive: true,
        tableStatus: "AVAILABLE",
      },
      select: {
        id: true,
        tableNumber: true,
        capacity: true,
        tableType: true,
        tableStatus: true,
        qrCode: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { tableNumber: "asc" },
      skip,
    });

    return {
      success: true,
      statusCode: 200,
      message: null,
      data: availableTables,
    };
  }

  async getTableById(id: number) {
    const tableData = await DB.table.findUnique({
      where: { id: id },
      select: {
        id: true,
        tableNumber: true,
        capacity: true,
        tableType: true,
        tableStatus: true,
        qrCode: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!tableData) {
      return {
        success: false,
        statusCode: 404,
        message: `Table with id ${id} not found`,
        data: null,
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: null,
      data: tableData,
    };
  }

  async updateTable(data: UpdateTableDTO) {
    const table = await DB.table.findUnique({
      where: { id: data.id },
    });

    if (!table) {
      return {
        success: false,
        statusCode: 404,
        message: `Table with id ${data.id} not found`,
        data: null,
      };
    }

    const updatedTable = await DB.table.update({
      where: { id: data.id },
      data: {
        tableNumber: data.tableNumber,
        capacity: data.capacity,
        tableType: data.tableType,
        tableStatus: data.tableStatus,
        qrCode: data.qrCode,
        isActive: data.isActive,
      },
      select: {
        id: true,
        tableNumber: true,
        capacity: true,
        tableType: true,
        tableStatus: true,
        qrCode: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      statusCode: 200,
      message: "Table data updated successfully",
      data: updatedTable,
    };
  }
}
