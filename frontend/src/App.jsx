import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout/Layout";
import ProtectedRoute from "@/components/Layout/ProtectedRoute";
import ClientsList from "@/pages/Client/ClientsList";
import LoginForm from "@/pages/Auth/LoginForm";
import PermissionRoute from "@/components/Layout/PermissionRoute";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={user ? <Navigate to="/clients" replace /> : <LoginForm />} 
      />

      <Route element={<ProtectedRoute />}>
        
        <Route element={<Layout />}>
          
          <Route element={<PermissionRoute requiredPermission="clients.index" />}>
            <Route path="/clients" element={<ClientsList />} />
          </Route>
          
          <Route
            path="/"
            element={
              <div className="p-8">
                <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
              </div>
            }
          />
          
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;