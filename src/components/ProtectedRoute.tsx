import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { getDataFromSessionStorage } from "@/lib/utils";
import { Header } from "./Header";
import { useAuthContext } from "@/features/auth/context/AuthContext";

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { user, setUser ,handleLogout} = useAuthContext();

  useEffect(() => {
    const storedUser = getDataFromSessionStorage("user");
    const token = localStorage.getItem("token") || "adminsdadsa";

    if (!token || !storedUser) {
      navigate("/login", { replace: true, state: { from: location } });
    } else if (allowedRoles && !allowedRoles.includes(storedUser.role)) {
      navigate("/", { replace: true });
    } else {
      setUser(storedUser);
    }

    setLoading(false);
  }, [navigate, location, allowedRoles]);

  if (loading || !user) return null;

  return (
    <>
      <Header
        isAuthenticated={true}
        onSignOut={handleLogout}
        user={{ name: user.name }}
        role={user.role}
      />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
