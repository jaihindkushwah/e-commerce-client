import { useRoutes, type RouteObject } from "react-router-dom";
import { Home } from "./features/home";

function AppRouter() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Home />,
    },{
      path:"/login",
      element: <h1>login</h1>
    },
    {
      path:"/register",
      element: <h1>register</h1>
    },
    {
      path:"/cart",
      element: <h1>cart</h1>
    },{
      path:"/checkout",
      element: <h1>checkout</h1>
    }
  ];

  return useRoutes(routes);
}

export default AppRouter;
