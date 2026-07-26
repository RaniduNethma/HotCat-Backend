import { AuthService } from '../services/auth.service.js';
import { AuthContext } from '../context.js';
import { LoginDTO, RegisterDTO } from '../types/types.js';

const authService = new AuthService();

export const authResolvers = {
  Query: {
    getProfile: async (_: any, __: any, context: AuthContext) => {
      if (!context.user) {
        throw new Error('Unauthorized! Please login first.');
      }
      return await authService.getProfile(context.user.id);
    },
  },

  Mutation: {
    register: async (_: any, args: { input: RegisterDTO }) => {
      return await authService.register(args.input);
    },

    login: async (_: any, args: { input: LoginDTO }) => {
      return await authService.login(args.input);
    },

    refreshToken: async (_: any, args: { token: string }) => {
      return await authService.refreshToken(args.token);
    },

    logout: async (_: any, __: any, context: AuthContext) => {
      if (!context.user) {
        throw new Error('Unauthorized! Please login first.');
      }
      return await authService.logout(context.user.id);
    },
  },
};
