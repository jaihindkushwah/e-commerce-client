import axios from 'axios';
import type { AxiosInstance } from 'axios';
// import { getDataFromSessionStorage } from '@/lib/utils';

export class AuthService {
  private axiosInstance: AxiosInstance;

  constructor() {
    // const token = getDataFromSessionStorage('token');
    this.axiosInstance = axios.create({
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
  }

  async login(credentials: { username: string; password: string }) {
    const res = await this.axiosInstance.post('/auth/login', credentials);
    return res.data;
  }

  async register(userData: {
    name: string;
    email: string;
    password: string;
    [key: string]: any;
  }) {
    const res = await this.axiosInstance.post('/auth/register', userData);
    return res.data;
  }

  async logout() {
    const res = await this.axiosInstance.post('/auth/logout');
    return res.data;
  }

  async getUser(userId: string) {
    const res = await this.axiosInstance.get(`/users/${userId}`);
    return res.data;
  }

  async isAuthenticated() {
    const res = await this.axiosInstance.get('/auth/check');
    return res.data.isAuthenticated;
  }

  async resetPassword(email: string) {
    const res = await this.axiosInstance.post('/auth/reset-password', { email });
    return res.data;
  }

  async verifyOtp(otp: string) {
    const res = await this.axiosInstance.post('/auth/verify-otp', { otp });
    return res.data;
  }

  async resendOtp(email: string) {
    const res = await this.axiosInstance.post('/auth/resend-otp', { email });
    return res.data;
  }
}
