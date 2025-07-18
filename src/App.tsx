import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { AuthContextProvider } from "./features/auth/context/AuthContext";
import { Toaster } from "./components/ui/sonner";
import { CartContextProvider } from "./features/cart/context/CartContext";
function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <CartContextProvider>
          <AppRouter />
          <Toaster />
        </CartContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
