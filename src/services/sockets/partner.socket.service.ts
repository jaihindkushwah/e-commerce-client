import { SocketService } from "./socket.service";

export class PartnerSocketService extends SocketService {}
export const partnerSocketService = new PartnerSocketService();
