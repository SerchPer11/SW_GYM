import { CardBox } from "@/components/common/CardBox";
import { useCrud } from "@/hooks/useCrud";
import PageHeader from "@/components/common/PageHeader";
import PermissionForm from "./PermissionForm";
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

export default function PermissionList() {
  const {
    data: permissions,
    extras: { modules } = {},
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
    fetchData: fetchpermissions,
    remove: handleDelete,
  } = useCrud("security/permissions", "Permiso", {
    includeExtras: true,
    extraKeys: ["modules"],
  });


  return (
    <CardBox>
      <PageHeader
        title="Gestionar Permisos"
        description="Administra la información de los permisos del sistema."
        actionButton={<PermissionForm onSuccess={fetchpermissions} modules={modules} />}
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
                  Clave de Módulo
                </TableHead>
                <TableHead className="text-slate-600 font-semibold text-xs uppercase tracking-wider text-center border-r-2 border-slate-300/70">
                  Fecha de Creación
                </TableHead>
                <TableHead className="text-slate-600 font-semibold text-xs uppercase tracking-wider text-center">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableSkeleton length={5} columns={5} />
              ) : permissions?.length > 0 ? (
                permissions.map((permission) => (
                  <TableRow
                    key={permission.id}
                    className="hover:bg-white/60 transition-colors border-b border-slate-400/70"
                  >
                    <TableCell className="font-medium text-slate-500 text-center border-2 border-slate-300/70">
                      #{permission.id}
                    </TableCell>
                    <TableCell className="text-slate-500 font-medium text-center border-2 border-slate-300/70 truncate max-w-sm">
                      {permission.name || "N/A"}
                    </TableCell>
                    <TableCell className="text-slate-500 text-center border-2 border-slate-300/70 truncate max-w-sm ">
                      {permission.description || "N/A"}
                    </TableCell>
                    <TableCell className="text-slate-500 text-center border-2 border-slate-300/70 truncate max-w-sm">
                      {permission.module_key || "N/A"}
                    </TableCell>
                    <TableCell className="text-slate-500 text-center border-2 border-slate-300/70">
                      {permission.formatted_created_at?.human || "N/A"}
                    </TableCell>
                    <TableCell className="text-center border-2 border-slate-300/70">
                      <div className="flex justify-center gap-2">
                        <PermissionForm
                          permission={permission}
                          onSuccess={fetchpermissions}
                          modules={modules}
                          trigger={
                            <Button
                              variant="default"
                              size="icon"
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
                              itemId: permission.id,
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
