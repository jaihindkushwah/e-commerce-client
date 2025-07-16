import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { Header } from "@/features/home";
import { getUserFromStorage } from "@/lib/utils";



interface ProtectedRouteProps {
  allowedRoles?: string[]; 
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUserFromStorage() ||  {role: "partner", name: "admin"};
    const token = localStorage.getItem("token") || "adminsdadsa";

    if (!token || !storedUser) {
      navigate("/login", { replace: true, state: { from: location } });
    } else if (
      allowedRoles &&
      !allowedRoles.includes(storedUser.role)
    ) {
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
        onSignOut={() => {
          localStorage.clear();
          // navigate("/login");
        }}
        user={{ name: user.name }}
        role={user.role}
      />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
