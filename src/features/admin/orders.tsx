import { useEffect, useState } from "react";
import OrderCard from "./components/order-card";
import type { IOrder } from "@/@types/order";
import { adminService } from "@/services/admin.service";

function AdminOrders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await adminService.getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };
    fetchOrders();
  }, []);
  return (
    <div className="w-full mt-4 min-h-screen min-sm:px-4">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders</h1>
          <p className="text-gray-600 text-sm">View and manage your orders</p>
        </div>
        <div className="space-y-2">
          {orders.map((order: any) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;
