import { io, Socket } from "socket.io-client";

const socketUrl = import.meta.env.VITE_SOCKET_URL ?? "http://localhost:8000/ws/api/v1/cart"; // Change this to your server URL


export class SocketService {
  public socket!: Socket;

  /**
   * Setup socket connection with optional JWT token
   */
  setupConnections(token?: string): void {
    this.socket = io(socketUrl, {
      transports: ["websocket"],
      secure: false, // Set to true if your server uses HTTPS
      withCredentials: true,
      auth: {
        auth:"Welcome"
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

  /**
   * Register default connection-related events
   */
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

  /**
   * Custom business events related to your app (like cart updates)
   */
  socketConnectionEvents(): void {
    this.socket.on("cart:update", (data) => {
      console.log("🛒 Cart update received:", data);
    });

    this.socket.on("cart:broadcast", (data) => {
      console.log("📢 Cart broadcast received:", data);
    });
  }

  /**
   * Emit cart update event
   */
  emitCartUpdate(cart: unknown): void {
    if (this.socket?.connected) {
      this.socket.emit("addToCart", cart);
    } else {
      console.warn("⚠️ Socket not connected. Cannot emit cart update.");
    }
  }

  /**
   * Gracefully disconnect socket
   */
  disconnect(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      console.log("❎ Socket disconnected and cleaned up");
    }
  }
}

// Export singleton instance
export const socketService = new SocketService();
