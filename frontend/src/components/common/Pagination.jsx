import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Pagination({ page, setPage, meta, isLoading }) {

  if (isLoading) {
    return (
      <div className="flex items-center justify-between px-4 py-2 border-t-2 border-slate-200/70 bg-transparent mt-2">
        <div className="flex-1 text-sm text-slate-500">
          <Skeleton className="h-4 w-48 bg-slate-200/50" />
        </div>
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 bg-slate-200/50" />
          <Skeleton className="h-8 w-8 bg-slate-200/50" />
          <Skeleton className="h-8 w-[100px] bg-slate-200/50" />
          <Skeleton className="h-8 w-8 bg-slate-200/50" />
          <Skeleton className="h-8 w-8 bg-slate-200/50" />
        </div>
      </div>
    );
  }

  if (!meta || meta.total === 0) return null;

  const { current_page, last_page, total, from, to } = meta;

  return (
    <div className="flex items-center justify-between px-4 py-2 border-t-2 border-slate-200/70 bg-transparent mt-2 sm:flex-row flex-col gap-2">
      <div className="flex-1 text-sm text-slate-500">
        Mostrando del{" "}
        <span className="font-semibold text-slate-700">{from || 0}</span> al{" "}
        <span className="font-semibold text-slate-700">{to || 0}</span> de{" "}
        <span className="font-semibold text-slate-700">{total}</span> registros.
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex text-slate-500 hover:text-slate-800"
          onClick={() => setPage(1)}
          disabled={current_page === 1}
        >
          <span className="sr-only">Ir a la primera página</span>
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="h-8 w-8 p-0 text-slate-500 hover:text-slate-800"
          onClick={() => setPage(current_page - 1)}
          disabled={current_page === 1}
        >
          <span className="sr-only">Página anterior</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex w-[100px] items-center justify-center text-sm font-medium text-slate-600">
          Página {current_page} de {last_page}
        </div>

        <Button
          variant="outline"
          className="h-8 w-8 p-0 text-slate-500 hover:text-slate-800"
          onClick={() => setPage(current_page + 1)}
          disabled={current_page === last_page}
        >
          <span className="sr-only">Página siguiente</span>
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex text-slate-500 hover:text-slate-800"
          onClick={() => setPage(last_page)}
          disabled={current_page === last_page}
        >
          <span className="sr-only">Ir a la última página</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}