import { getDataFromSessionStorage } from "@/lib/utils";
import type { AxiosInstance } from "axios";
import axios from "axios";

export class PartnerService{
    private axiosInstance!:AxiosInstance;
    constructor(){
        const token=getDataFromSessionStorage("token");
        this.axiosInstance=axios.create({
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
    }
}