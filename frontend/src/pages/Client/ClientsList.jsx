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
    <div>
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
        />
        <CardBox
          variant="pressed"
          className="p-0 overflow-hidden flex flex-col"
        >
          <div className="overflow-x-auto">
            <Table className="md:table-auto w-full">
              <TableHeader className="bg-transparent border-b border-slate-200/70">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[80px] text-slate-400 font-semibold text-xs uppercase tracking-wider text-center h-12">
                    ID
                  </TableHead>
                  <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider text-center">
                    Nombre
                  </TableHead>
                  <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider text-center">
                    Correo
                  </TableHead>
                  <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider text-center">
                    Teléfono
                  </TableHead>
                  <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider text-center">
                    Inscripción
                  </TableHead>
                  <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider text-center">
                    Estado
                  </TableHead>
                  <TableHead className="text-slate-400 font-semibold text-xs uppercase tracking-wider text-center">
                    Acciones
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableSkeleton length={5} columns={7} />
                ) : clients.length > 0 ? (
                  clients.map((client) => (
                    // 🌟 FILAS: Hover que se ilumina (blanco translúcido) en lugar de oscurecerse
                    <TableRow
                      key={client.id}
                      className="hover:bg-white/60 transition-colors border-b border-slate-200/50"
                    >
                      <TableCell className="font-medium text-slate-400 text-center">
                        #{client.id}
                      </TableCell>
                      <TableCell className="text-slate-600 font-medium text-center">
                        {client.user?.full_name || "N/A"}
                      </TableCell>
                      <TableCell className="text-slate-500 text-center">
                        {client.user?.email || "N/A"}
                      </TableCell>
                      <TableCell className="text-slate-500 text-center">
                        {client.phone || "N/A"}
                      </TableCell>
                      <TableCell className="text-slate-500 text-center">
                        {client.inscription_date
                          ? client.inscription_date?.human
                          : "Sin fecha"}
                      </TableCell>
                      <TableCell className="text-center">
                        {/* Píldoras de estado con colores suaves */}
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
                            client.status === 1
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              : "bg-rose-50 text-rose-600 border border-rose-100"
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
                              // 🌟 BOTONES: Ligeramente elevados (bg-white shadow-sm) para que destaquen del hueco
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 text-slate-500 hover:text-blue-600 bg-white shadow-sm border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            }
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-slate-500 hover:text-rose-600 bg-white shadow-sm border-slate-200 hover:border-rose-200 hover:bg-rose-50 transition-all"
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
              isLoading={isLoading}/>
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
    </div>
  );
}
