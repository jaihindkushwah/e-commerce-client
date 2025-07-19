import { SocketService } from "./socket.service";

export class AdminSocketService extends SocketService {}
export const adminSocketService = new AdminSocketService();
