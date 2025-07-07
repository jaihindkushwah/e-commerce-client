import React from "react";
import type { CartItem as CartItemType } from "../types";

interface Props {
  item: CartItemType;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<Props> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <li className="py-6 flex">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.title}
          width={96}
          height={96}
          className="w-full h-full object-center object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="line-clamp-2">{item.title}</h3>
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500 capitalize">
            {item.category}
          </p>
          <p className="mt-1 text-sm text-gray-600">
            ${item.price.toFixed(2)} each
          </p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center space-x-2">
            <label htmlFor={`quantity-${item.id}`} className="text-gray-500">
              Qty:
            </label>
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                className="px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                -
              </button>
              <input
                id={`quantity-${item.id}`}
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  onQuantityChange(item.id, parseInt(e.target.value) || 1)
                }
                className="w-16 px-2 py-1 text-black text-center border-0 focus:ring-0"
              />
              <button
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                className="px-2 py-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          <button
            onClick={() => onRemove(item.id)}
            className="font-medium text-red-600 hover:text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
