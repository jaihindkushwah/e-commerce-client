
import { WS_BASE_URL } from "@/lib/config";
import { getDataFromSessionStorage } from "@/lib/utils";
import { io, Socket } from "socket.io-client";

export class SocketService {
  public socket!: Socket;

  setupConnections(): void {
    const token = getDataFromSessionStorage("token");
    this.socket = io(WS_BASE_URL, {
      transports: ["websocket"],
      secure: false,
      withCredentials: true,
      auth: {
        token: token,
      },
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 5000,
    });

    this.registerDefaultEvents();
  }

  private registerDefaultEvents(): void {
    this.socket.on("connect", () => {
      console.log("✅ Socket connected:", this.socket.id);
    });

    this.socket.on("disconnect", (reason) => {
      console.warn("🔌 Socket disconnected:", reason);
    });

    this.socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err);
    });
  }

  socketConnectionEvents(): void {
    this.socket.on("cart:update", (data) => {
      console.log("🛒 Cart update received:", data);
    });

    this.socket.on("cart:broadcast", (data) => {
      console.log("📢 Cart broadcast received:", data);
    });
  }
  emitAddToCart(data:{productId: string, quantity: number}): void {
    if (this.socket?.connected) {
      this.socket.emit("addToCart", data);
    } else {
      console.warn("⚠️ Socket not connected. Cannot emit cart broadcast.");
    }
  }
  emitRemoveFromCart(data:{productId: string,cartId: string}): void {
    if (this.socket?.connected) {
      this.socket.emit("removeFromCart", data);
    } else {
      console.warn("⚠️ Socket not connected. Cannot emit cart broadcast.");
    }
  }

  emitCartUpdate(cart: unknown): void {
    if (this.socket?.connected) {
      this.socket.emit("addToCart", cart);
    } else {
      console.warn("⚠️ Socket not connected. Cannot emit cart update.");
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      console.log("❎ Socket disconnected and cleaned up");
    }
  }
}

export const socketService = new SocketService();
