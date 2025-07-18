import type { IOrder } from "@/@types/order";
import { API_BASE_URL } from "@/lib/config";
import { getDataFromSessionStorage } from "@/lib/utils";
import type { AxiosInstance } from "axios";
import axios from "axios";

export class PartnerService{
    private axiosInstance!:AxiosInstance;
    constructor(){
        const token=getDataFromSessionStorage("token");
        this.axiosInstance=axios.create({
            baseURL:API_BASE_URL,
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    }
    async getMyOrders(): Promise<IOrder[] | []> {
        const res = await this.axiosInstance.get("/partner/orders");
        return res.data?.data;
    }
    async getMyProducts(): Promise<IOrder[] | []> {
        const res = await this.axiosInstance.get("/partner/products");
        return res.data?.data;
    }
    async getStatusByProductId(id:string): Promise<IOrder[] | []> {
        const res = await this.axiosInstance.get(`/partner/orders/${id}`);
        return res.data?.data;
    }
    async updateStatusByProductId(data:{id:string;status:string}): Promise<IOrder[] | []> {
        const res = await this.axiosInstance.put(`/partner/orders/${data.id}`,data);
        return res.data?.data;
    }

}