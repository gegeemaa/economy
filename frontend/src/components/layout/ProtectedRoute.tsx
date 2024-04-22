// ProtectedRoute.js
import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = useMemo(() => {
    const user = localStorage.getItem("user");
    console.log("Tookkken: ", user);
    return !!user;
  }, []);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
