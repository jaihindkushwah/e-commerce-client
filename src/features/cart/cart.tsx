import { useEffect, useState } from "react";
import CartItemList from "./components/CartItemList";
import OrderSummary from "./components/OrderSummary";
import PromoCode from "./components/PromoCode";

import type { CartItem, Product } from "./types";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import EmptyCart from "./components/EmptyCart";
import { socketService } from "../../sockets/socket.service";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialCartItemIds = [1, 2, 3, 5];
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        const products: Product[] = await res.json();
        const simulatedCart: CartItem[] = products
          .filter((p) => initialCartItemIds.includes(p.id))
          .map((p) => ({ ...p, quantity: Math.floor(Math.random() * 3) + 1 }));
        setCartItems(simulatedCart);
      } catch {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
    socketService.setupConnections();
    return () => socketService.disconnect();
  }, []);

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
    socketService.emitCartUpdate({ id, quantity });
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  if (cartItems.length === 0) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Cart Items */}
          <div className="lg:col-span-7 bg-white rounded-lg shadow-sm px-4 py-6 sm:px-6">
            <CartItemList
              items={cartItems}
              onQuantityChange={updateQuantity}
              onRemove={removeItem}
            />
          </div>

          {/* Summary + Promo */}
          <div className="mt-16 lg:mt-0 lg:col-span-5 space-y-6">
            <OrderSummary itemTotal={totalPrice} itemCount={totalItems} />
            <PromoCode />
          </div>
        </div>
      </div>
    </div>
  );
}
