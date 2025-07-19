import type { IUser } from "@/@types/auth";
import { useEffect, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminService } from "@/services/admin.service";
import { getDataFromSessionStorage } from "@/lib/utils";

interface PartnerCardProps {
  partner: {
    _id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  };
}

export function PartnerCard({ partner }: PartnerCardProps) {
  return (
    <Card key={partner._id} className="w-full max-w-xl">
      <CardContent className="flex items-center gap-4 p-4 ">
        <Avatar className="w-12 h-12">
          <AvatarImage src={partner.avatarUrl} alt={partner.name} />
          <AvatarFallback>{partner.name[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{partner.name}</h2>
          <p className="text-sm text-gray-500">{partner.email}</p>
          <p className="text-sm text-gray-500">ID: {partner._id}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function Partners() {
  const [parnters, setPartners] = useState<IUser[]>([]);
  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const adminService = AdminService.init(getDataFromSessionStorage("token"));
        const data = await adminService.getAllPartners();
        setPartners(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };
    fetchPartners();
  }, []);
  return (
    <div className="w-full mt-4 min-h-screen min-sm:px-4">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Partners</h1>
          <p className="text-gray-600 text-sm">View and manage your partners</p>
        </div>
        <div className="space-y-2">
          {parnters.map((partner) => (
            <PartnerCard key={partner._id} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Partners;
