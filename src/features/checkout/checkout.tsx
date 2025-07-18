
import { AddressCard } from "../cart/components/AddressCard";
import type { IAddress } from "@/@types/order";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddressFormModal } from "../cart/components/AddressFormModel";
import OrderSummary from "./components/OrderSummary";

const data = [
  {
    _id: "1",
    userId: "user1",
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "US",
    phone: "(555) 123-4567",
    isDefault: true,
  },
  {
    _id: "2",
    userId: "user1",
    street: "456 Oak Avenue",
    city: "Los Angeles",
    state: "CA",
    zip: "90210",
    country: "US",
    phone: "(555) 987-6543",
    isDefault: false,
  },
];
function Checkout() {
    const [addressId, setAddressId] = useState<IAddress['_id'] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleAddAddress = () => {
      console.log("add address");
    }
  return (
    <div className="w-full mt-4 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600 text-sm">
            Select a shipping address to complete your order
          </p>
        </div>
       <div className="grid grid-cols-2 max-md:grid-cols-1 gap-8">
         <div className="mt-2">
          {/* For shipping address*/}
          <div className="bg-white rounded-lg shadow-sm px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping Address
              </h2>
              <Button onClick={() => setIsModalOpen(true)} variant="outline" className="flex text-black gap-2 items-center">
                <Plus className="h-4 w-4" />
                Add a new address
              </Button>
            </div>
            <div className="mt-6 space-y-4">
              {data.map((address) => (
                <AddressCard
                  key={address._id}
                  address={address}
                  isSelected={address._id === addressId}
                  onSelect={() => {
                    setAddressId(address._id);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
       <div className="max-sm:mt-8 mt-2">
         <OrderSummary itemTotal={100} itemCount={1} />
       </div>
       </div>
      </div>
      
      <AddressFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddAddress} />
    </div>
  );
}

export default Checkout;
