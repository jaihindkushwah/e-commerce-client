import type { IProduct } from "@/@types/product";
import { API_BASE_URL } from "@/lib/config";
import { getDataFromSessionStorage } from "@/lib/utils";
import type { AxiosInstance } from "axios";
import axios from "axios";

export class ProductService {
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
  async getAllProducts(): Promise<IProduct[] | []> {
    const res = await this.axiosInstance.get("/customer/products");
    return res.data?.data;
  }
  async getProductById(
    id: string
  ): Promise<(IProduct & { isInCart?: boolean }) | null> {
    const res = await this.axiosInstance.get(`/customer/products/${id}`);
    return res.data?.data;
  }
}
export const productService = new ProductService();
