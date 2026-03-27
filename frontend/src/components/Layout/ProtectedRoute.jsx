import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { Dumbbell } from "lucide-react";

export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  // Mientras verificamos el token con Laravel, mostramos una pantalla de carga
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 font-medium text-slate-500 text-lg font-medium gap-6 flex-col">
        <Dumbbell className="animate-spin text-blue-500" size={48} />
        Cargando pesos pesados...</div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
// redirect to the requested route
  return <Outlet />;
}