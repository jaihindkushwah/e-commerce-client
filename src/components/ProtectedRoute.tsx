import { Outlet, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

function ProtectedRoute() {
  //   const navigate = useNavigate();
  //   const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       navigate("/login");
  //     } else {
  //       setIsAuthorized(true);
  //     }
  //   }, [navigate]);
  //   if (isAuthorized === null) return null;

  return <Outlet />;
}

export default ProtectedRoute;
