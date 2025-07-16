import { useRoutes, type RouteObject } from "react-router-dom";
// import { Home } from "./features/home";
import CartPage from "./features/cart/cart";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import VerifyOtp from "./features/auth/EmailVerification";
import ResetPassword from "./features/auth/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import { Home } from "./features/home";

function AppRouter() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/checkout",
          element: <h1>checkout</h1>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },

    {
      path: "/verify-email",
      element: <VerifyOtp />,
    },
    {
      path: "/reset-password",
      element: <ResetPassword />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  return useRoutes(routes);
}

export default AppRouter;
