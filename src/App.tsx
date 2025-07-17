import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { AuthContextProvider } from "./features/auth/context/AuthContext";
import { Toaster } from "./components/ui/sonner";
function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <AppRouter />
      <Toaster />
    </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
