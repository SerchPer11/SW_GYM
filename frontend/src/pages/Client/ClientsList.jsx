import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomButton from "@/components/CustomButton";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ClientForm from "./ClientForm";

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Cargar clientes al montar el componente
  const fetchClients = () => {
    api
      .get("/clients")
      .then((response) => setClients(response.data.data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Función para manejar el Soft Delete
  const handleDelete = async (id) => {
    if (
      window.confirm(
        "¿Estás seguro de eliminar este cliente? Se mantendrá en el historial de auditoría.",
      )
    ) {
      try {
        await api.delete(`/clients/${id}`);
        // Filtramos el estado local para que desaparezca visualmente
        setClients(clients.filter((c) => c.id !== id));
      } catch (error) {
        console.error("No se pudo eliminar:", error);
      }
    }
  };

  // Filtrado básico en el cliente
  const filteredClients = clients.filter(
    (client) =>
      client.phone?.includes(searchTerm) ||
      client.id.toString().includes(searchTerm),
  );

  const [open, setOpen] = useState(false);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Gestión de Clientes
          </h1>
          <p className="text-slate-500">
            Administra los miembros y sus membresías.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <CustomButton
              icon={Plus}
              variant="default"
              className="bg-slate-900"
            >
              Nuevo Cliente
            </CustomButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Registrar Nuevo Socio
              </DialogTitle>
            </DialogHeader>
            <ClientForm
              onSuccess={() => {
                setOpen(false);
                fetchClients();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2 mb-6 max-w-sm">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Buscar por teléfono o ID..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Vencimiento</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <TableRow
                  key={client.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <TableCell className="font-medium text-slate-600">
                    #{client.id}
                  </TableCell>
                  <TableCell>{client.phone || "N/A"}</TableCell>
                  <TableCell className="text-slate-600">
                    {client.expiration_date
                      ? new Date(client.expiration_date).toLocaleDateString(
                          "es-MX",
                          { day: "2-digit", month: "short", year: "numeric" },
                        )
                      : "Sin fecha"}
                  </TableCell>
                  <TableCell>
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
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="default"
                        size="icon"
                        className="h-8 w-8 text-blue-100 hover:text-blue-600"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="h-8 w-8 text-rose-100 hover:text-rose-400"
                        onClick={() => handleDelete(client.id)}
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
      </div>
    </div>
  );
}
