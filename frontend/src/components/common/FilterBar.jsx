import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterBar({
  filters,
  setFilters,
  statusFilter,
  setStatusFilter,
  perPage,
  setPerPage,
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <span className="text-sm text-slate-500 hidden sm:inline-block">
          Mostrar:
        </span>
        <Select
          value={perPage?.toString()}
          onValueChange={(val) => setPerPage(Number(val))}
        >
          <SelectTrigger className="w-[80px] bg-white">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-4 text-slate-400" />
          <Input
            placeholder="Buscar..."
            className="pl-10 w-full bg-white"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <X 
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-4 text-slate-400 cursor-pointer"
            onClick={() => setFilters({ ...filters, search: "" })}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[150px] bg-white">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="1">Activos</SelectItem>
            <SelectItem value="0">Inactivos</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
