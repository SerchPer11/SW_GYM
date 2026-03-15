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
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <PageHeader
        title="Gestionar Socios"
        description="Administra la información de los socios y sus membresías."
        actionButton={<ClientForm onSuccess={fetchClients} />}
      />

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        perPage={perPage}
        setPerPage={setPerPage}
      />

      <div className="bg-slate-50/50 rounded-sm shadow-sm border-b-2 border-slate-300 overflow-hidden">
        <Table className="md:table-auto">
          <TableHeader className="bg-slate-700 border-b-2 border-slate-300">
            <TableRow>
              <TableHead className="w-[80px] text-slate-300 text-center">
                ID
              </TableHead>
              <TableHead className="text-slate-300 text-center">
                Nombre
              </TableHead>
              <TableHead className="text-slate-300 text-center">
                Correo
              </TableHead>
              <TableHead className="text-slate-300 text-center">
                Teléfono
              </TableHead>
              <TableHead className="text-slate-300 text-center">
                Fecha de Inscripción
              </TableHead>
              <TableHead className="text-slate-300 text-center">
                Estado
              </TableHead>
              <TableHead className="text-slate-300 text-center">
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
                  className="hover:bg-slate-300/50 transition-colors border-b border-slate-200"
                >
                  <TableCell className="font-medium text-slate-500 text-center">
                    #{client.id}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.user?.full_name || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.user?.email || "N/A"}
                  </TableCell>
                  <TableCell className="text-center">
                    {client.phone || "N/A"}
                  </TableCell>
                  <TableCell className="text-slate-600 text-center">
                    {client.inscription_date
                      ? client.inscription_date?.human
                      : "Sin fecha"}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        client.status === 1
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {client.status === 1 ? "Activo" : "Inactivo"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <ClientForm
                        client={client}
                        onSuccess={fetchClients}
                        trigger={
                          <Button
                            variant="default"
                            size="icon"
                            className="h-8 w-8 text-slate-700 hover:text-slate-500 bg-slate-100 hover:bg-slate-300"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                        }
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 text-rose-500 hover:text-rose-700 bg-slate-100 hover:bg-slate-300"
                        onClick={() =>
                          setConfirmModal({ isOpen: true, itemId: client.id })
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
                  colSpan={5}
                  className="h-24 text-center text-slate-500"
                >
                  No se encontraron clientes registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination
          meta={meta}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
        />
      </div>

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
    </div>
  );
}
