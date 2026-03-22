import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/Layout/AppSidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-dvh overflow-hidden w-full bg-slate-50">
        <header className="flex h-16 shrink-0 items-center gap-4 border-b border-slate-200/70 bg-white/80 backdrop-blur-md px-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] z-10">
          <SidebarTrigger className="relative z-20 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors" />
          <div className="flex-1 flex items-center">
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden w-full relative">
          <div className="mx-auto w-full max-w-6xl p-6 md:p-8">
            <Outlet />
          </div>
        </main>

      </SidebarInset>
    </SidebarProvider>
  );
}