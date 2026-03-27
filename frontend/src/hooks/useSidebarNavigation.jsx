import { useAuth } from "@/Context/AuthContext";
import {
  Home,
  Users,
  Shield,
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
      title: "Seguridad",
      icon: Shield,
      type: "group",
      isActive: true,
      items: [
        {
          title: "Modulos",
          url: "/security/modules",
          permission: "modules.index",
        },
        {
          title: "Permisos",
          url: "/security/permissions",
          permission: "permissions.index",
        },
        {
          title: "Roles",
          url: "/security/roles",
          permission: "roles.index",
        }
      ],
    },
    {
      title: "Usuarios",
      icon: Users,
      type: "group",
      isActive: true,
      items: [
        {
          title: "Personal",
          url: "/users/personal",
          permission: "personal.index",
        },
        {
          title: "Clientes",
          url: "/users/clients",
          icon: Users,
          permission: "clients.index",
        },
      ],
    },
  ];

  const menuItems = rawMenuItems
    .map((item) => {
      if (item.type !== "group") {
        return item;
      }

      return {
        ...item,
        items: item.items.filter((subItem) => hasPermission(subItem.permission)),
      };
    })
    .filter((item) => {
      if (item.type === "group") {
        return item.items.length > 0;
      }

      return hasPermission(item.permission);
    });

  return { menuItems };
}
