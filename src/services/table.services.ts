import DB from "../configs/dbConfig.js";
import { CreateTableDTO } from "../types/types.js";
import { TableType, TableStatus } from "@prisma/client";

export class TableService {
  async createTable(data: CreateTableDTO) {
    const existingTable = await DB.table.findUnique({
      where: { tableNumber: data.tableNumber },
    });

    if (existingTable != null) {
      return {
        statusCode: 409,
        message: "Table number already exists",
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
      statusCode: 200,
      message: "Create table successful",
      data: newTable,
    };
  }

  async getAllTables(page: number) {
    const limit: number = 10;
    const skip: number = (page - 1) * limit;

    const allTables = await DB.table.findMany({
      take: limit,
      skip,
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
    });

    return {
      statusCode: 200,
      data: allTables,
    };
  }

  async getAvailableTables() {
    return await DB.table.findMany({
      where: {
        isActive: true,
        tableStatus: "AVAILABLE",
      },
      orderBy: { tableNumber: "asc" },
    });
  }

  async getTableById(id: number) {
      const tableData = await DB.table.findUnique({
        where: { id: id },
        select: {
          id: true,
          tableNumber: true,
          tableStatus: true,
        },
      });

      return {
        statusCode: 200,
        data: tableData,
      };
    }
  }

  updateTable = async (
    id: number,
    newTableNumber: number,
    newStatus: TableStatus
  ) => {
    if (!id) {
      return {
        statusCode: 404,
        message: `Table with id ${id} not found`,
      };
    }

    try {
      await DB.table.update({
        where: { id: id },
        data: {
          tableNumber: newTableNumber,
          tableStatus: newStatus,
        },
      });

      const updatedTable = await DB.table.findUnique({
        where: { id: id },
        select: {
          id: true,
          tableNumber: true,
          tableStatus: true,
        },
      });

      return {
        statusCode: 200,
        message: "Table data updated successfully",
        data: updatedTable,
      };
    } catch (error) {
      console.error("Error executing updateTable", error);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  };

  deleteTable = async (id: number) => {
    if (!id) {
      return {
        statusCode: 404,
        message: `Table with id ${id} not found`,
      };
    }

    try {
      await DB.table.delete({
        where: { id: id },
      });

      return {
        statusCode: 200,
        message: "Table deleted successfully",
      };
    } catch (error) {
      console.error("Error executing deleteTable", error);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  };
}
