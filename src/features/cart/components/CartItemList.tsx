import React from "react";
import CartItem from "./CartItem";
import type { CartItem as CartItemType } from "../types";

interface Props {
  items: CartItemType[];
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const CartItemList: React.FC<Props> = ({
  items,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <ul className="-my-6 divide-y divide-gray-200">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
};

export default CartItemList;
