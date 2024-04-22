// ProtectedRoute.js
import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = useMemo(() => {
    const aa = localStorage.getItem("userToken");
    console.log("Tookkken: ", aa);
    return !!aa;
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
