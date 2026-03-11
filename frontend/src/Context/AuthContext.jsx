import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "@/services/authService";
import { toast } from "sonner";

// Create the AuthContext
const AuthContext = createContext();
//
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // indicates if the authentication status is being checked

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("auth_token");

      if (token) {
        try {
          const response = await authService.getProfile();

          setUser(response.user);
        } catch (error) {
          localStorage.removeItem("auth_token");
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const data = await authService.login(credentials);

      localStorage.setItem("auth_token", data.access_token);

      setUser(data.user);
      toast.success("Sesión iniciada correctamente.");
      return { success: true };
    } catch (error) {
      const backendErrors = error.response?.data?.errors || {};
      const errorMessage =
        error.response?.data?.message || "Credenciales incorrectas";
      toast.error("Error al iniciar sesión. Verifique sus credenciales");
      return { success: false, errors: backendErrors };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      toast.error("Error al cerrar sesión. Inténtalo de nuevo.");
    } finally {
      localStorage.removeItem("auth_token");
      setUser(null);
      toast.info("Sesión cerrada correctamente");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
