import type { IOrder } from "@/@types/order";
import { API_BASE_URL } from "@/lib/config";
import { getDataFromSessionStorage } from "@/lib/utils";
import type { AxiosInstance } from "axios";
import axios from "axios";

export class OrderService {
  private axiosInstance!: AxiosInstance;
  constructor() {
    const token = getDataFromSessionStorage("token");
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  async getMyOrders(): Promise<IOrder[] | []> {
    const res = await this.axiosInstance.get("/customer/orders");
    return res.data?.data;
  }
}
export const orderService = new OrderService();
