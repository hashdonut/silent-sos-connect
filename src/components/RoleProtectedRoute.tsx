// components/RoleProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const RoleProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) return null; // Or a loader

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!allowedRoles.includes(role || "")) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default RoleProtectedRoute;
