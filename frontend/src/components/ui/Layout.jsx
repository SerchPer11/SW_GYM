import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/AppSidebar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <SidebarInset className="flex flex-col h-dvh">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-slate-800 border-slate-500 shadow-sm pl-4 pr-4">
          <SidebarTrigger className="relative z-20 text-slate-300 hover:text-white" />
        </header>
        
        <main className="flex-1 p-6 bg-slate-200/50 overflow-auto min-h-0">
          {children}
        </main>

        <Toaster position="top-right" richColors />
      </SidebarInset>
    </SidebarProvider>
  );
}
