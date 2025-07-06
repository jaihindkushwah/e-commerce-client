import { useRoutes, type RouteObject } from "react-router-dom";
import { Home } from "./features/home";

function AppRouter() {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Home />,
    },
  ];

  return useRoutes(routes);
}

export default AppRouter;
