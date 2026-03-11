import { useAuth } from "@/context/AuthContext";
import {
  Home,
  Users,
  Dumbbell,
  Calendar,
  Settings,
  ChevronRight,
} from "lucide-react";

export function useSidebarNavigation() {
  const { user } = useAuth();

  const hasPermission = (permissionName) => {
    if (!permissionName) return true;

    const isAdmin = user?.roles?.some((role) => role.name === "admin");
    if (isAdmin) return true;

    return user?.permissions?.some((p) => p.name === permissionName);
  };
  const rawMenuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      type: "single",
    },
    {
      title: "Clientes",
      url: "/clients",
      icon: Users,
      type: "single",
      permission: "clients.index",
    },
    {
      title: "Membresías",
      icon: Dumbbell,
      type: "group",
      // Si quieres que el menú empiece abierto por defecto
      isActive: true,
      items: [
        { title: "Planes Activos", url: "/memberships/active" },
        { title: "Renovaciones", url: "/memberships/renewals" },
        { title: "Historial", url: "/memberships/history" },
      ],
    },
    {
      title: "Agenda",
      icon: Calendar,
      type: "group",
      isActive: true,
      items: [
        { title: "Clases Grupales", url: "/schedule/classes" },
        { title: "Entrenadores", url: "/schedule/trainers" },
      ],
    },
  ];

  const menuItems = rawMenuItems.filter((item) =>
    hasPermission(item.permission),
  );

  return { menuItems };
}
