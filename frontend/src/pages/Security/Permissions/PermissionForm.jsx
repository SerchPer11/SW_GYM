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
import { CardBox } from "@/components/common/CardBox";

export default function PermissionForm({
  permission,
  onSuccess,
  trigger,
  modules,
}) {
  const { isOpen, openModal, closeModal } = useModal();

  const { handleSubmit, errors, isLoading, isEditMode } = useForm(
    permission,
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
            Nuevo Permiso
          </CustomButton>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader class="px-4">
          <DialogTitle className="text-xl font-bold">
            {isEditMode ? "Editar Permiso" : "Registrar Nuevo Permiso"}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {isEditMode
              ? "Actualiza la información del permiso."
              : "Completa el formulario para registrar un nuevo permiso."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-1" noValidate>
          <input
            type="hidden"
            name="guard_name"
            value={permission?.guard_name || "web"}
          />
          <CardBox variant="elevated">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Nombre"
                name="name"
                placeholder="Socios"
                defaultValue={permission?.name}
                error={errors.name?.[0]}
                required
                maxLength={150}
              />
              <FormInput
                type="select"
                label="Clave de Módulo"
                name="module_key"
                defaultValue={permission?.module_key}
                error={errors.module_key?.[0]}
                required
                options={
                  modules?.map((module) => ({
                    label: module.name,
                    value: module.key,
                  })) || []
                }
              />
            </div>
            <FormInput
              type="textarea"
              label="Descripción"
              name="description"
              placeholder="Descripción del permiso"
              defaultValue={permission?.description}
              error={errors.description?.[0]}
              required
              maxLength={500}
            />
          </CardBox>

          <CustomButton
            variant="default"
            isLoading={isLoading}
            icon={Save}
            className="w-full mt-4"
          >
            {isEditMode ? "Actualizar Permiso" : "Guardar Permiso"}
          </CustomButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
