import FormInput from "@/components/common/FormInput";
import CustomButton from "@/components/common/CustomButton";
import { Save, Plus } from "lucide-react";
import { useModal } from "@/hooks/useModal";
import { useForm } from "./Hooks/useForm";
import { MultiCheckButtons } from "@/components/common/MultiCheckButtons";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { CardBox } from "@/components/common/CardBox";

export default function RoleForm({
  role,
  onSuccess,
  trigger,
  permissions,
  modules,
}) {
  const { isOpen, openModal, closeModal } = useModal();

  const {
    handleSubmit,
    errors,
    isLoading,
    isEditMode,
    setSelectedModuleKey,
    moduleOptions,
    filteredPermissions,
  } = useForm(role, permissions, modules, () => {
    closeModal();
    if (onSuccess) onSuccess();
  });

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
            Nuevo Rol
          </CustomButton>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader class="px-4">
          <DialogTitle className="text-xl font-bold">
            {isEditMode ? "Editar Rol" : "Registrar Nuevo Rol"}
          </DialogTitle>
          <DialogDescription className="text-slate-600">
            {isEditMode
              ? "Actualiza la información del Rol."
              : "Completa el formulario para registrar un nuevo Rol."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-1" noValidate>
          <CardBox variant="elevated">
            <FormInput
              label="Nombre"
              name="name"
              placeholder="Socio"
              defaultValue={role?.name}
              error={errors.name?.[0]}
              required
            />
            <FormInput
              type="textarea"
              label="Descripción"
              name="description"
              placeholder="Descripción del Rol"
              defaultValue={role?.description}
              error={errors.description?.[0]}
              required
            />
            <FormInput
              type="select"
              label="Filtrar por Módulo"
              name="modules"
              defaultValue="all"
              onChange={setSelectedModuleKey}
              error={errors.modules?.[0]}
              options={moduleOptions}
            />
            <MultiCheckButtons
              title="Selecciona los permisos asociados a este rol"
              options={filteredPermissions.map((perm) => ({
                label: `${perm.name} - ${perm.description}`,
                value: perm.id,
              }))}
              name="permissions"
              defaultValues={role?.permissions?.map((p) => p.id) || []}
              error={errors.permissions?.[0]}
            />
          </CardBox>

          <CustomButton
            variant="default"
            isLoading={isLoading}
            icon={Save}
            className="w-full mt-4"
          >
            {isEditMode ? "Actualizar Rol" : "Guardar Rol"}
          </CustomButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
