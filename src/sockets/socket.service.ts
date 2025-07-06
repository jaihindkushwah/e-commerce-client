import { io, Socket } from "socket.io-client";

const url = "http://localhost:8000/socket";

export class SocketService {
  public socket!: Socket;

  setupConnections(token?:string): void {
    this.socket = io(url, {
      transports: ["websocket"], // ✅ use "websocket"
      secure: false,             // ✅ true if using https
      withCredentials: true,     // ✅ important if you set credentials: true on server
      extraHeaders: {
        // Optional: custom headers if needed (e.g., Authorization)
        Authorization: `Bearer ${token}`,
      },
    });

    this.registerDefaultEvents();
  }

  private registerDefaultEvents(): void {
    this.socket.on("connect", () => {
      console.log("✅ Socket connected:", this.socket.id);
    });

    this.socket.on("disconnect", () => {
      console.log("🔌 Socket disconnected");
    });

    this.socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
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

  emitCartUpdate(cart: unknown): void {
    this.socket.emit("cart:update", cart);
  }
}
export const socketService=new SocketService();
// socketService.setupConnections()