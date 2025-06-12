// src/components/RoleProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type RoleProtectedRouteProps = {
  allowedRoles: ("admin" | "ngo" | "user")[];
};

const RoleProtectedRoute = ({ allowedRoles }: RoleProtectedRouteProps) => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    // Optionally replace with a proper spinner or skeleton UI
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleProtectedRoute;
