import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import ClientForm from "./ClientForm";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import PageHeader from "@/components/common/PageHeader";
import { useCrud } from "@/hooks/useCrud";
import Pagination from "@/components/common/Pagination";
import FilterBar from "@/components/common/FilterBar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableSkeleton from "@/components/common/TableSkeleton";
import { CardBox } from "@/components/common/CardBox";

export default function ClientsList() {
  const {
    data: clients,
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
    fetchData: fetchClients,
    remove: handleDelete,
  } = useCrud("users/clients", "Socio");

  return (
    <CardBox>
      <PageHeader
        title="Gestionar Socios"
        description="Administra la información de los socios y sus membresías."
        actionButton={<ClientForm onSuccess={fetchClients} />}
      />
      <CardBox variant="raised">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          perPage={perPage}
          setPerPage={setPerPage}
          hasIsActive
        />
        <div className="overflow-x-auto">
          <Table className="md:table-auto w-full">
            <TableHeader className="bg-slate-200 border-b-2 border-slate-400/70">
              <TableRow className="hover:bg-transparent border-2 border-slate-300/70">
                <TableHead className="w-[80px] text-slate-600 font-semibold text-xs uppercase tracking-wider text-center h-12 border-r-2 border-slate-300/70">
                  ID
                </TableHead>
                <TableHead className="text-slate-600 font-semibold text-xs uppercase tracking-wider text-center h-12 border-r-2 border-slate-300/70">
                  Nombre
                </TableHead>
                <TableHead className="text-slate-600 font-semibold text-xs uppercase tracking-wider text-center h-12 border-r-2 border-slate-300/70">
                  Correo
                </TableHead>
                <TableHead className="text-slate-600 font-semibold text-xs uppercase tracking-wider text-center h-12 border-r-2 border-slate-300/70">
                  Teléfono
                </TableHead>
                <TableHead className="text-slate-600 font-semibold text-xs uppercase tracking-wider text-center h-12 border-r-2 border-slate-300/70">
                  Inscripción
                </TableHead>
                <TableHead className="text-slate-600 font-semibold text-xs uppercase tracking-wider text-center h-12 border-r-2 border-slate-300/70">
                  Estado
                </TableHead>
                <TableHead className="text-slate-600 font-semibold text-xs uppercase tracking-wider text-center h-12 border-r-2 border-slate-300/70">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableSkeleton length={5} columns={7} />
              ) : clients.length > 0 ? (
                clients.map((client) => (
                  <TableRow
                    key={client.id}
                    className="hover:bg-white/60 transition-colors border-b border-slate-400/70"
                  >
                    <TableCell className="font-medium text-slate-400 text-center border-2 border-slate-300/70">
                      #{client.id}
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium text-center border-2 border-slate-300/70 max-w-xs truncate">
                      {client.user?.full_name || "N/A"}
                    </TableCell>
                    <TableCell className="text-slate-500 text-center border-2 border-slate-300/70 max-w-xs truncate">
                      {client.user?.email || "N/A"}
                    </TableCell>
                    <TableCell className="text-slate-500 text-center border-2 border-slate-300/70 max-w-xs truncate">
                      {client.phone || "N/A"}
                    </TableCell>
                    <TableCell className="text-slate-500 text-center border-2 border-slate-300/70">
                      {client.inscription_date
                        ? client.inscription_date_formatted?.human
                        : "Sin fecha"}
                    </TableCell>
                    <TableCell className="text-center border-2 border-slate-300/70">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
                          client.status === 1
                            ? "bg-emerald-100 text-emerald-600 border border-emerald-200"
                            : "bg-rose-100 text-rose-600 border border-rose-200"
                        }`}
                      >
                        {client.status === 1 ? "Activo" : "Inactivo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-center border-2 border-slate-300/70">
                      <div className="flex justify-center gap-2">
                        <ClientForm
                          client={client}
                          onSuccess={fetchClients}
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
                              itemId: client.id,
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
                    No se encontraron clientes registrados.
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
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, itemId: null })}
        onConfirm={handleDelete}
        title="Eliminar registro de cliente"
        description="Esta acción desvinculará al cliente del sistema y perderá su acceso. ¿Deseas continuar?"
        confirmText="Sí, dar de baja"
        cancelText="Conservar cliente"
        variant="destructive"
      />
    </CardBox>
  );
}
