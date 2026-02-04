import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { JWTUtil } from "../utils/jwt.util.js";
import { SocketUser } from "../types/types.js";
import { env } from "../configs/envConfig.js";

export const activeConnections = {
  cashier: new Map<string, SocketUser>(),
  waiter: new Map<string, SocketUser>(),
  chef: new Map<string, SocketUser>(),
  customer: new Map<string, string>(),
};

export const initializeSocketIO = (httpServer: HTTPServer): SocketIOServer => {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    const sessionId = socket.handshake.auth.sessionId; // For customers without accounts

    if (sessionId && !token) {
      socket.data.sessionId = sessionId;
      socket.data.role = "CUSTOMER";
      return next();
    }

    if (token) {
      try {
        const decoded = JWTUtil.verifyAccessToken(token);
        socket.data.userId = decoded.id;
        socket.data.role = decoded.userRole;
        next();
      } catch (error) {
        next(new Error("Authentication failed"));
      }
    } else {
      next(new Error("No authentication provided"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    const { role, userId, sessionId } = socket.data;

    if (role === "CASHIER") {
      activeConnections.cashier.set(userId, {
        userId,
        role,
        socketId: socket.id,
      });
    } else if (role === "WAITER") {
      activeConnections.waiter.set(userId, {
        userId,
        role,
        socketId: socket.id,
      });
    } else if (role === "CHEF") {
      activeConnections.chef.set(userId, {
        userId,
        role,
        socketId: socket.id,
      });
    } else if (role === "CUSTOMER") {
      activeConnections.customer.set(sessionId, socket.id);
    }

    socket.join(role);

    socket.on("disconnect", () => {
      if (role === "CASHIER") {
        activeConnections.cashier.delete(userId);
      } else if (role === "WAITER") {
        activeConnections.waiter.delete(userId);
      } else if (role === "CHEF") {
        activeConnections.chef.delete(userId);
      } else if (role === "CUSTOMER") {
        activeConnections.customer.delete(sessionId);
      }
    });

    socket.emit("connected", {
      message: `Connected as ${role}`,
      socketId: socket.id,
    });
  });

  return io;
};
