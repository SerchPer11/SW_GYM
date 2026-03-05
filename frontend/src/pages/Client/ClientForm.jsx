import { useState } from "react";
import api from "@/lib/axios";
import FormInput from "@/components/FormInput";
import CustomButton from "@/components/CustomButton";
import { Save } from "lucide-react";
import { toast } from "sonner";

export default function ClientForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const res = await api.post("/clients", data);
      toast.success("¡Bienvenido al equipo!", {
        description: `El socio ${data.name} ha sido registrado correctamente.`,
      });
      onSuccess();
      onSuccess();
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-1">
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Nombre"
          name="name"
          placeholder="Juan"
          error={errors.name?.[0]}
          required
        />
        <FormInput
          label="Apellidos"
          name="lastname"
          placeholder="Pérez"
          error={errors.lastname?.[0]}
          required
        />
      </div>
      <FormInput
        label="Email"
        name="email"
        type="email"
        placeholder="juan@gym.com"
        error={errors.email?.[0]}
        required
      />
      <FormInput
        label="Teléfono"
        name="phone"
        placeholder="777..."
        error={errors.phone?.[0]}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          label="Inscripción"
          name="inscription_date"
          type="date"
          error={errors.inscription_date?.[0]}
        />
        <FormInput
          label="Vencimiento"
          name="expiration_date"
          type="date"
          error={errors.expiration_date?.[0]}
        />
      </div>

      <CustomButton
        type="submit"
        isLoading={loading}
        icon={Save}
        className="w-full mt-4 bg-slate-900"
      >
        Guardar Miembro
      </CustomButton>
    </form>
  );
}
