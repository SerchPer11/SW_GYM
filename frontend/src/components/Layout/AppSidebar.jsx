import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
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
  const { user, logout } = useAuth();

  return (
    <Sidebar
      collapsible="icon"
      className="bg-slate-900 border-none shadow-[4px_0_24px_rgba(0,0,0,0.15)] z-20"
    >
      <SidebarHeader className="pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="bg-transparent hover:bg-slate-800/50 transition-colors"
              tooltip="Inicio"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-800 shadow-[2px_2px_4px_rgba(0,0,0,0.5),-1px_-1px_2px_rgba(255,255,255,0.08)] text-emerald-500">
                <Dumbbell className="size-5" />
              </div>
              <div className="ml-2 hidden text-sm font-semibold md:block">
                <span className="font-bold text-slate-100 tracking-wide">
                  GymManager
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="mt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500 font-semibold text-xs uppercase tracking-wider mb-2">
            Plataforma
          </SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => {
              if (item.type === "single") {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className="text-slate-400 font-medium hover:bg-slate-800/50 hover:text-slate-200 data-[active=true]:bg-slate-950 data-[active=true]:text-emerald-500 data-[active=true]:shadow-[inset_2px_3px_6px_rgba(0,0,0,0.6),inset_-1px_-1px_2px_rgba(255,255,255,0.03)] transition-all rounded-xl"
                      tooltip={item.title}
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
                const hasActiveSubItem = item.items.some(
                  (subItem) =>
                    location.pathname === subItem.url ||
                    location.pathname.startsWith(`${subItem.url}/`),
                );

                return (
                  <Collapsible
                    key={item.title}
                    defaultOpen={item.isActive || hasActiveSubItem}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          tooltip={item.title}
                          isActive={hasActiveSubItem}
                          className="text-slate-400 font-medium hover:bg-slate-800/50 hover:text-slate-200 transition-all rounded-xl data-[active=true]:bg-slate-950 data-[active=true]:text-emerald-500 data-[active=true]:shadow-[inset_2px_3px_6px_rgba(0,0,0,0.6),inset_-1px_-1px_2px_rgba(255,255,255,0.03)]"
                        >
                          <item.icon />
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-slate-500" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="border-l border-slate-800 ml-4 pl-2 mt-1">
                          {item.items.map((subItem) => {
                            const isSubActive =
                              location.pathname === subItem.url;

                            return (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={isSubActive}
                                  className="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 data-[active=true]:bg-slate-950/80 data-[active=true]:text-emerald-500 data-[active=true]:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)] transition-all rounded-lg my-0.5"
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

      <SidebarFooter className="mb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="w-full bg-slate-950 shadow-[inset_2px_3px_6px_rgba(0,0,0,0.6),inset_-1px_-1px_2px_rgba(255,255,255,0.03)] hover:bg-slate-950/90 text-slate-300 hover:text-white transition-all rounded-xl p-2 h-auto data-[state=open]:bg-slate-950"
                    tooltip={`${user?.name} ${user?.lastname}`}
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-slate-800 shadow-[2px_2px_4px_rgba(0,0,0,0.5),-1px_-1px_2px_rgba(255,255,255,0.08)] text-emerald-500">
                    <span className="font-bold text-lg uppercase">
                      {user?.name?.charAt(0) || "U"}
                    </span>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                    <span className="truncate font-semibold text-slate-200">
                      {user?.name} {user?.lastname}
                    </span>
                    <span className="truncate text-xs text-slate-500">
                      {user?.email}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-slate-500" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-xl border border-slate-700 bg-slate-800 shadow-xl p-2"
                side="right"
                align="end"
                sideOffset={12}
              >
                <DropdownMenuLabel className="p-0 font-normal mb-2">
                  <div className="flex items-center gap-3 px-2 py-1.5 text-left text-sm">
                    <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-slate-700 text-emerald-400 shadow-sm">
                      <span className="font-bold uppercase">
                        {user?.name?.charAt(0) || "U"}
                      </span>
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-slate-200">
                        {user?.name} {user?.lastname}
                      </span>
                      <span className="truncate text-xs text-slate-400">
                        {user?.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700 mb-2" />

                <DropdownMenuItem className="text-slate-300 focus:bg-slate-700 focus:text-white hover:bg-slate-700 rounded-lg cursor-pointer mb-1 transition-colors">
                  <User className="mr-2 size-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={logout}
                  className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400 hover:bg-rose-500/10 hover:text-rose-400 rounded-lg cursor-pointer transition-colors"
                >
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
