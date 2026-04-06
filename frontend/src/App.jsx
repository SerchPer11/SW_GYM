import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { Dumbbell } from "lucide-react";

const Layout = lazy(() => import("@/components/Layout/Layout"));
const ProtectedRoute = lazy(() => import("@/components/Layout/ProtectedRoute"));
const PermissionRoute = lazy(
  () => import("@/components/Layout/PermissionRoute"),
);
const ClientsList = lazy(() => import("@/pages/Users/Client/ClientsList"));
const LoginForm = lazy(() => import("@/pages/Auth/LoginForm"));
const ModulesList = lazy(() => import("@/pages/Security/Modules/ModulesList"));
const PermissionList = lazy(() => import("@/pages/Security/Permissions/PermissionList"));
const RolesList = lazy(() => import("@/pages/Security/Roles/RoleList"));

function App() {
  const { user } = useAuth();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-100 text-lg font-medium text-slate-500 font-medium gap-6 flex-col">
          <Dumbbell className="animate-spin text-blue-500" size={48} />
          Cargando pesos pesados...
        </div>
      }
    >
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <LoginForm />}
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            // DASHBOARD HOME
            <Route
              path="/"
              element={
                <div className="p-8">
                  <h1 className="text-2xl font-bold">
                    Bienvenido al Dashboard
                  </h1>
                </div>
              }
            />
            // SECURITY ROUTES 
            // Modules
            <Route
              element={<PermissionRoute requiredPermission="modules.index" />}
            >
              <Route path="security/modules" element={<ModulesList />} />
            </Route>
            // Permissions
            <Route
              element={
                <PermissionRoute requiredPermission="permissions.index" />
              }
            >
              <Route path="security/permissions" element={<PermissionList />} />
            </Route>
            // Roles
            <Route
              element={
                <PermissionRoute requiredPermission="roles.index" />
              }
            >
              <Route path="security/roles" element={<RolesList />} />
            </Route>
            

            // USER ROUTES
            <Route
              element={<PermissionRoute requiredPermission="clients.index" />}
            >
              <Route path="users/clients" element={<ClientsList />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
