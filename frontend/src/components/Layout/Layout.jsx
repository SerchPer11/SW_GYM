import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/Layout/AppSidebar";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-dvh overflow-hidden w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-slate-800 border-slate-500 shadow-sm pl-4 pr-4">
          <SidebarTrigger className="relative z-20 text-slate-300 hover:text-white" />
        </header>
        
        <main className="flex-1 bg-slate-200/50 overflow-y-auto overflow-x-hidden w-full">
          <div className="mx-auto w-full max-w-5xl p-4 md:p-6">
            <Outlet />
          </div>
        </main>

        
      </SidebarInset>
    </SidebarProvider>
  );
}
