import type { IOrder } from "@/@types/order";
import { PartnerService } from "@/services/partner.service";
import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/context/AuthContext";

function Notifications() {
  const { user } = useAuthContext();
  const [unassignedOrders, setUnassignedOrders] = useState<IOrder[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const partnerService = PartnerService.init(user?.token!);
        const data = await partnerService.getUnassignedOrders();
        setUnassignedOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    }
    fetchOrders();
  },[])

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Accept order notifications</h1>
          <p className="text-gray-600 text-sm">View and manage your order notifications</p>
        </div>
      </div>
    </div>
  )
}

export default Notifications