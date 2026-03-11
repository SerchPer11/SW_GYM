import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  Dumbbell,
  User,
} from "lucide-react";
import { useSidebarNavigation } from "@/hooks/useSidebarNavigation";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppSidebar() {
  const location = useLocation();
  const { menuItems } = useSidebarNavigation();

  return (
    <Sidebar
      collapsible="icon"
      className="bg-slate-800 border-r-1 border-slate-500 shadow-sm"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="border-b-2 border-r-2 border-slate-600 bg-slate-800 text-white hover:bg-slate-500 transition-colors"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-500 text-white">
                <Dumbbell className="size-4" />
              </div>
              <div className="ml-2 hidden text-sm font-semibold md:block">
                <span className="font-semibold text-white">Gym Manager</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-300">
            Plataforma
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => {
              // RENDERIZAR ELEMENTOS SIMPLES
              if (item.type === "single") {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="text-slate-300 hover:bg-slate-700 hover:text-white data-[active=true]:bg-slate-600 data-[active=true]:text-white transition-colors"
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              }

              if (item.type === "group") {
                return (
                  <Collapsible
                    key={item.title}
                    defaultOpen={item.isActive}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={item.title} className="hover:bg-slate-700 hover:text-white transition-colors">
                          <item.icon className="text-slate-300" />
                          <span className="text-slate-300">{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-slate-300" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => {
                            // Calculamos si este sub-elemento exacto es el activo
                            const isSubActive =
                              location.pathname === subItem.url;

                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubActive}
                                  className="text-slate-300 hover:bg-slate-700 hover:text-white data-[active=true]:bg-slate-600 data-[active=true]:text-white transition-colors"
                                >
                                  <Link to={subItem.url}>
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            );
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }
              return null;
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="rounded border-t-2 border-r-2 border-slate-700 bg-slate-800 text-slate-200">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-slate-700 data-[state=open]:text-slate-foreground hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-500 text-slate-300">
                    <span className="font-bold">A</span>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Admin</span>
                    <span className="truncate text-xs">admin@gym.com</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border-t-2 border-r-2 border-slate-400 bg-slate-800 p-1"
                side="right"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-500 text-slate-300">
                      <span className="font-bold">A</span>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-slate-300">
                        Admin
                      </span>
                      <span className="truncate text-xs text-slate-400">
                        admin@gym.com
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-600" />

                <DropdownMenuItem className="text-slate-300 focus:bg-slate-700 hover:bg-slate-700 transition-colors hover:text-white">
                  <User className="mr-2 size-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-slate-600" />

                <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 hover:bg-red-900 transition-colors hover:text-red-300">
                  <LogOut className="mr-2 size-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
