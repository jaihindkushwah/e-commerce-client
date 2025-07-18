import type { ICart } from "@/@types/cart";
import { API_BASE_URL } from "@/lib/config";
import { getDataFromSessionStorage } from "@/lib/utils";
import type { AxiosInstance } from "axios";
import axios from "axios";

export class CartService {
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
  async addToCart(data: {
    productId: string;
    quantity: number;
  }): Promise<ICart> {
    const res = await this.axiosInstance.post("/customer/add-to-cart", data);
    return res.data.data;
  }
  async getCartItems(): Promise<ICart> {
    const res = await this.axiosInstance.get("/customer/cart");
    return res.data.data;
  }
  async removeFromCart(data: {
    productId: string;
    cartId: string;
  }): Promise<ICart> {
    const res = await this.axiosInstance.post(
      "/customer/remove-from-cart",
      data
    );
    return res.data.data;
  }
  async clearCart(): Promise<ICart> {
    const res = await this.axiosInstance.post("/customer/clear-cart");
    return res.data.data;
  }
  async updateCart(data: {
    productId: string;
    quantity: number;
  }): Promise<ICart> {
    const res = await this.axiosInstance.post("/customer/update-cart", data);
    return res.data.data;
  }
}

export const cartService = new CartService();
