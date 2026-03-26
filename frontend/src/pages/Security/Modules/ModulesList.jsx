import { CardBox } from "@/components/common/CardBox";
import { useCrud } from "@/hooks/useCrud";
import PageHeader from "@/components/common/PageHeader";
import ModuleForm from "./ModuleForm";
import FilterBar from "@/components/common/FilterBar";
import TableSkeleton from "@/components/common/TableSkeleton";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Pagination from "@/components/common/Pagination";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ModulesList() {
  const {
    data: modules,
    isLoading,
    filters,
    setFilters,
    page,
    perPage,
    setPerPage,
    setPage,
    statusFilter,
    setStatusFilter,
    meta,
    confirmModal,
    setConfirmModal,
    fetchData: fetchModules,
    remove: handleDelete,
  } = useCrud("security/modules", "Módulo");

  return (
    <CardBox>
      <PageHeader
        title="Gestionar Módulos"
        description="Administra la información de los módulos del sistema."
        actionButton={<ModuleForm onSuccess={fetchModules} />}
      />
      <CardBox>
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          perPage={perPage}
          setPerPage={setPerPage}
        />
        <div className="overflow-x-auto">
          <Table className="md:table-auto w-full">
            <TableHeader className="bg-slate-200 border-b-2 border-slate-400/70">
              <TableRow className="hover:bg-transparent border-2 border-slate-300/70">
                <TableHead className="w-[80px] text-slate-600 font-semibold text-xs uppercase tracking-wider text-center h-12 border-r-2 border-slate-300/70">
                  ID
                </TableHead>
                <TableHead className="text-slate-600 font-semibold text-xs uppercase tracking-wider text-center border-r-2 border-slate-300/70">
                  Nombre
                </TableHead>
                <TableHead className="text-slate-600 font-semibold text-xs uppercase tracking-wider text-center border-r-2 border-slate-300/70">
                  Descripción
                </TableHead>
                <TableHead className="text-slate-600 font-semibold text-xs uppercase tracking-wider text-center border-r-2 border-slate-300/70">
                  Clave
                </TableHead>
                <TableHead className="text-slate-600 font-semibold text-xs uppercase tracking-wider text-center">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableSkeleton length={5} columns={5} />
              ) : modules.length > 0 ? (
                modules.map((module) => (
                  <TableRow
                    key={module.id}
                    className="hover:bg-white/60 transition-colors border-b border-slate-400/70"
                  >
                    <TableCell className="font-medium text-slate-500 text-center border-2 border-slate-300/70">
                      #{module.id}
                    </TableCell>
                    <TableCell className="text-slate-500 font-medium text-center border-2 border-slate-300/70">
                      {module.name || "N/A"}
                    </TableCell>
                    <TableCell className="text-slate-500 text-center border-2 border-slate-300/70">
                      {module.description || "N/A"}
                    </TableCell>
                    <TableCell className="text-slate-500 text-center border-2 border-slate-300/70">
                      {module.key || "N/A"}
                    </TableCell>
                    <TableCell className="text-center border-2 border-slate-300/70">
                      <div className="flex justify-center gap-2">
                        <ModuleForm
                          module={module}
                          onSuccess={fetchModules}
                          trigger={
                            <Button
                              variant="default"
                              size="icon"
                              //className="text-slate-500 hover:text-blue-600 bg-white shadow-sm border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          }
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() =>
                            setConfirmModal({
                              isOpen: true,
                              itemId: module.id,
                            })
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-32 text-center text-slate-400 font-medium"
                  >
                    No se encontraron módulos registrados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Pagination
          meta={meta}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
        />
      </CardBox>

      <ConfirmDialog
        isLoading={isLoading}
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, itemId: null })}
        onConfirm={handleDelete}
        title="Eliminar registro de módulo"
        description="Esta acción desvinculará al módulo del sistema y los permisos asociados. ¿Deseas continuar?"
        variant="destructive"
      />
    </CardBox>
  );
}
