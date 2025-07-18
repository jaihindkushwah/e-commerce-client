import { useRoutes, type RouteObject } from "react-router-dom";
import CartPage from "./features/cart/cart";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import VerifyOtp from "./features/auth/EmailVerification";
import ResetPassword from "./features/auth/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import ProductCatalog from "./features/products/ProductCatalog";
import { RoleRedirect } from "./components/RoleRedirect";
import SingleProduct from "./features/products/SingleProduct";
import CustomerOrderHistory from "./features/orders/CustomerOrderHistory";
import AllOrdersForAdmin from "./features/orders/AllOrders";

const AppContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-screen min-h-screen  text-white">{children}</div>
  );
};

function AppRouter() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: (
        <AppContainer>
          <ProtectedRoute allowedRoles={["customer"]} />
        </AppContainer>
      ),
      children: [
        {
          path: "/",
          element: <RoleRedirect />,
        },
        { path: "/products", element: <ProductCatalog /> },
        { path: "/products/:id", element: <SingleProduct /> },
        { path: "/cart", element: <CartPage /> },
        { path: "/checkout", element: <h1>Checkout</h1> },
        { path: "/profile", element: <h1>Profile</h1> },
        { path: "/order-history", element: <CustomerOrderHistory /> },
      ],
    },

    // Admin routes
    {
      path: "/admin",
      element: (
        <AppContainer>
          <ProtectedRoute allowedRoles={["admin"]} />
        </AppContainer>
      ),
      children: [
        {
          path: "/admin/orders",
          element:<AllOrdersForAdmin/>,
        },
        {
          path: "/admin/partners",
          element: <h1 className="bg-black">Partner Management</h1>,
        },
      ],
    },
    // Partner routes
    {
      path: "/partner",
      element: (
        <AppContainer>
          <ProtectedRoute allowedRoles={["partner"]} />
        </AppContainer>
      ),
      children: [
        { path: "/partner/dashboard", element: <h1>Partner Dashboard</h1> },
        { path: "/partner/products", element: <h1>Partner Products</h1> },
      ],
    },

    // Public auth routes
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/verify-email", element: <VerifyOtp /> },
    { path: "/reset-password", element: <ResetPassword /> },

    // 404
    { path: "*", element: <NotFound /> },
  ];

  return useRoutes(routes);
}
export default AppRouter;
