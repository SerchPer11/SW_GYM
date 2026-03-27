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

export default function ModuleForm({ module, onSuccess, trigger }) {
  const { isOpen, openModal, closeModal } = useModal();

  const { handleSubmit, errors, isLoading, isEditMode } = useForm(
    module,
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
            Nuevo Módulo
          </CustomButton>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader class="px-4">
          <DialogTitle className="text-xl font-bold">
            {isEditMode ? "Editar Módulo" : "Registrar Nuevo Módulo"}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {isEditMode
              ? "Actualiza la información del módulo."
              : "Completa el formulario para registrar un nuevo módulo."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-1" noValidate>
          <CardBox variant="elevated">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Nombre"
                name="name"
                placeholder="Socios"
                defaultValue={module?.name}
                error={errors.name?.[0]}
                required
              />
              <FormInput
                label="Clave"
                name="key"
                placeholder="clients"
                defaultValue={module?.key}
                error={errors.key?.[0]}
                required
              />
            </div>
            <FormInput
              type="textarea"
              label="Descripción"
              name="description"
              placeholder="Descripción del módulo"
              defaultValue={module?.description}
              error={errors.description?.[0]}
              required
            />
          </CardBox>

          <CustomButton
            variant="default"
            isLoading={isLoading}
            icon={Save}
            className="w-full mt-4"
          >
            {isEditMode ? "Actualizar Módulo" : "Guardar Módulo"}
          </CustomButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
