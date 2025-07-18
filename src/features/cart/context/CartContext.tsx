import type { ICart, ICartContextType } from "@/@types/cart";
import { cartService } from "@/services/cart.service";
import { socketService } from "@/services/sockets/socket.service";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};

export const CartContext = createContext<ICartContextType | null>(null);

export function CartContextProvider({ children }: any) {
  const [cartData, setCartData] = useState<ICart>({} as ICart);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const data = await cartService.getCartItems();
        setCartData(data);
      } catch {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
    socketService.setupConnections();
    return () => socketService.disconnect();
  }, [setCartData]);

  const handleAddToCart = (cart: ICart) => setCartData(cart);
  const handeUpdateCart = useCallback(async (id: string, quantity: number) => {
    try {
      setLoading(true);
      await cartService.addToCart({ productId: id, quantity });
    } catch (error) {
      console.log(error);
      setError("Failed to update cart.");
    }
    setLoading(false);
  }, []);
  const handleRemoveFromCart = async (id: string) => {
    try {
      setLoading(true);
      await cartService.removeFromCart({ productId: id, cartId: cartData._id });
    } catch (error) {
      console.log(error);
      setError("Failed to remove from cart.");
    }
    setLoading(false);
  };
  const handleClearCart = () => setCartData({} as ICart);
  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        handleAddToCart,
        handeUpdateCart,
        handleRemoveFromCart,
        handleClearCart,
        loading,
        error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
