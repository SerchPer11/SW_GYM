import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import FormInput from "@/components/common/FormInput";
import CustomButton from "@/components/common/CustomButton";
import { Lock, Mail, LogIn } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginForm() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(null);

    const formData = new FormData(e.target);
    const credentials = Object.fromEntries(formData);

    try {
      const result = await login(credentials);

        if (!result.success) {
          setErrors(result.errors);
        }

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="space-y-1 text-center bg-slate-800 text-white rounded-t-lg pb-6 pt-8">
          <CardTitle className="text-2xl font-bold tracking-tight">
            GymManager ERP
          </CardTitle>
          <CardDescription className="text-slate-300">
            Ingresa tus credenciales para acceder al sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FormInput
              label="Correo Electrónico"
              name="email"
              type="email"
              placeholder="admin@gym.com"
              error={errors?.email?.[0]}
              required
            />
            
            <FormInput
              label="Contraseña"
              name="password"
              type="password"
              placeholder="••••••••"
              error={errors?.password?.[0]}
              required
            />
            <CustomButton
              variant="default"
              isLoading={isLoading}
              icon={LogIn}
              className="w-full mt-4"
            >
              {isLoading ? "Verificando credenciales..." : "Iniciar Sesión"}
            </CustomButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
