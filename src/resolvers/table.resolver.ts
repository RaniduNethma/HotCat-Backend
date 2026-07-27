import { AuthContext } from '../context.js';
import { TableService } from '../services/table.services.js';
import { CreateTableDTO, UpdateTableDTO } from '../types/types.js';
import { checkRole } from '../utils/auth.util.js';

const tableService = new TableService();

export const tableResolvers = {
  Query: {
    getAllTables: async (_: any, args: { page: number }, context: AuthContext) => {
      if (!context.user) throw new Error('Unauthorized! Please login.');
      return await tableService.getAllTables(args.page);
    },

    getTableById: async (_: any, args: { id: number }, context: AuthContext) => {
      if (!context.user) throw new Error('Unauthorized! Please login.');
      return await tableService.getTableById(args.id);
    },

    getAvailableTables: async (_: any, args: { page: number }, context: AuthContext) => {
      if (!context.user) throw new Error('Unauthorized! Please login.');
      return await tableService.getAvailableTables(args.page);
    },
  },

  Mutation: {
    createTable: async (_: any, args: { input: CreateTableDTO }, context: AuthContext) => {
      checkRole(context.user, ['ADMIN', 'MANAGER', 'OFFICER']);
      return await tableService.createTable(args.input);
    },

    updateTable: async (_: any, args: { input: UpdateTableDTO }, context: AuthContext) => {
      checkRole(context.user, ['ADMIN', 'MANAGER', 'OFFICER']);
      return await tableService.updateTable(args.input);
    },

    deleteTable: async (_: any, args: { id: number }, context: AuthContext) => {
      checkRole(context.user, ['ADMIN', 'MANAGER']);
      return await tableService.deleteTable(args.id);
    },
  },
};
