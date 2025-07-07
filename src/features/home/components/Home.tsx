import CartPage from "../../cart/cart";
import { Header } from "./Header";
export default function Home() {
  return (
    <div className="min-w-screen min-h-screen bg-black text-white">
      <Header />
      <CartPage />
    </div>
  );
}
