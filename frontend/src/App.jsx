import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import ClientsList from "@/pages/Client/ClientsList";
import LoginForm from "@/pages/Auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { Dumbbell } from "lucide-react";

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-700 text-lg font-medium gap-6 flex-col">
        <Dumbbell className="animate-spin text-slate-500" size={48} />
        Cargando pesos pesados...</div>;
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/clients" element={<ClientsList />} />
        <Route
          path="/"
          element={
            <div className="p-8">
              <h1>Bienvenido al Dashboard</h1>
            </div>
          }
        />
        // otras rutas...
      </Routes>
    </Layout>
  );
}

export default App;
