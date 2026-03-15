import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function PermissionRoute({ requiredPermission }) {
  const { user } = useAuth();

  const isAdmin = user?.roles?.some((role) => role.name === "admin");
  
  const hasPermission = user?.permissions?.some((p) => p.name === requiredPermission);

  if (isAdmin || hasPermission) {
    return <Outlet />;
  }

  toast.error("Acceso denegado: No tienes permisos para esta sección.");
  return <Navigate to="/" replace />;
}