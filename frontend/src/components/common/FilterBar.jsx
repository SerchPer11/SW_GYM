import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CardBox } from "@/components/common/CardBox"; // Asegúrate de que la ruta sea correcta

export default function FilterBar({
  filters,
  setFilters,
  statusFilter,
  setStatusFilter,
  perPage,
  setPerPage,
}) {
  return (
    <CardBox className="mb-6 p-3" variant="pressed">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-sm font-medium text-slate-500 hidden sm:inline-block">
            Mostrar
          </span>
          <Select
            value={perPage?.toString()}
            onValueChange={(val) => setPerPage(Number(val))}
          >
            <SelectTrigger className="w-[80px] bg-white border-0 shadow-sm focus:ring-2 focus:ring-slate-400 rounded-lg transition-all font-medium text-slate-700">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 shadow-lg">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap sm:flex-row items-center gap-3 w-full sm:w-auto">
          
          <div className="relative w-full sm:w-72 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            <Input
              placeholder="Buscar socio por nombre, correo..."
              className="pl-9 pr-10 w-full bg-white border-0 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-400/50 rounded-lg transition-all text-slate-700 placeholder:text-slate-400"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
            
            {filters.search && (
              <div 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-slate-100 cursor-pointer text-slate-400 hover:text-rose-500 transition-colors"
                onClick={() => setFilters({ ...filters, search: "" })}
                title="Limpiar búsqueda"
              >
                <X className="w-4 h-4" />
              </div>
            )}
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[150px] bg-white border-0 shadow-sm focus:ring-2 focus:ring-slate-400 rounded-lg transition-all font-medium text-slate-700">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-slate-200 shadow-lg">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="1">Activos</SelectItem>
              <SelectItem value="0">Inactivos</SelectItem>
            </SelectContent>
          </Select>
          
        </div>
      </div>
    </CardBox>
  );
}