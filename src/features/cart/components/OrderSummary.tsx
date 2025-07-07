import React from "react";

interface Props {
  itemTotal: number;
  itemCount: number;
}

const OrderSummary: React.FC<Props> = ({ itemTotal, itemCount }) => {
  const shipping = 5.99;
  const tax = itemTotal * 0.08;
  const total = itemTotal + shipping + tax;

  return (
    <div className="bg-white rounded-lg shadow-sm px-4 py-6 sm:px-6">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <p>Items ({itemCount})</p>
          <p className="font-medium text-gray-900">${itemTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <p>Shipping</p>
          <p className="font-medium text-gray-900">${shipping.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <p>Tax</p>
          <p className="font-medium text-gray-900">${tax.toFixed(2)}</p>
        </div>
        <div className="border-t border-gray-200 pt-4 flex justify-between text-base font-medium text-gray-900">
          <p>Order Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
      </div>
      <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
