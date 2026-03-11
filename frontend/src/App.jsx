import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import ClientsList from "@/pages/Client/ClientsList";

function App() {
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
