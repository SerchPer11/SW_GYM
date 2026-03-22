import FormInput from "@/components/common/FormInput";
import CustomButton from "@/components/common/CustomButton";
import { Save, Plus } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { useForm } from "./Hooks/useForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

export default function ClientForm({ client, onSuccess, trigger }) {
  const { isOpen, openModal, closeModal } = useModal();

  const { handleSubmit, errors, isLoading, isEditMode } = useForm(
    client,
    () => {
      closeModal();
      if (onSuccess) onSuccess();
    },
  );

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? openModal() : closeModal())}
    >
      <DialogTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <CustomButton icon={Plus} variant="default">
            Nuevo Socio
          </CustomButton>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {isEditMode ? "Editar Socio" : "Registrar Nuevo Socio"}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {isEditMode
              ? "Actualiza la información del socio."
              : "Completa el formulario para registrar un nuevo socio."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-1" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Nombre"
              name="name"
              placeholder="Juan"
              defaultValue={client?.user?.name}
              error={errors.name?.[0]}
              required
            />
            <FormInput
              label="Apellidos"
              name="lastname"
              placeholder="Pérez"
              defaultValue={client?.user?.lastname}
              error={errors.lastname?.[0]}
              required
            />
          </div>
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="juan@gym.com"
            defaultValue={client?.user?.email}
            error={errors.email?.[0]}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              type="number"
              label="Teléfono"
              name="phone"
              placeholder="777..."
              defaultValue={client?.phone}
              error={errors.phone?.[0]}
            />
            <FormInput
              type="select"
              label="Sexo"
              name="gender"
              placeholder="Selecciona sexo"
              defaultValue={client?.user?.gender}
              error={errors.gender?.[0]}
              options={[
                { value: "male", label: "Masculino" },
                { value: "female", label: "Femenino" },
                { value: "other", label: "Otro" }
              ]}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <FormInput
              label="Inscripción"
              name="inscription_date"
              type="date"
              defaultValue={client?.inscription_date?.raw || new Date().toISOString().split("T")[0]}
              error={errors.inscription_date?.[0]}
              disabled={isEditMode}
            />
            <FormInput
              label="Vencimiento"
              name="expiration_date"
              type="date"
              defaultValue={client?.expiration_date?.raw}
              error={errors.expiration_date?.[0]}
            />
          </div>

          <CustomButton
            variant="default"
            isLoading={isLoading}
            icon={Save}
            className="w-full mt-4"
          >
            {isEditMode ? "Actualizar Miembro" : "Guardar Miembro"}
          </CustomButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
