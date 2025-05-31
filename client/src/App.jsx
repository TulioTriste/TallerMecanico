import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import RecoverPasswordPage from "./Pages/RecoverPasswordPage";
import Dashboard from "./Pages/Dashboard";
import PlansPage from "./Pages/PlansPage";
import { AuthProvider } from "./context/authContext";
import Workshops from "./Pages/Workshops";
import WorkshopDash from "./Pages/WorkshopDash";
import { ProtectedRoute } from "./routes";
import { WorkshopProvider } from "./context/workshopContext";
import WorkOrderForm from "./Pages/FormNewOt";
import ListaEmpleados from "./Pages/Employees";
import FormularioEmpleado from "./Pages/FormEmployee";
import SeleccionSucursal from "./Pages/SelectSucursal";

function App() {
  return (
    <AuthProvider>
      <WorkshopProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/RecoverPassword" element={<RecoverPasswordPage />} />
            <Route path="/plans" element={<PlansPage />} />
            {/*<Route element={<ProtectedRoute />}>*/}
              <Route path="/workshops"element={<Workshops />} />
              <Route path="/workshop/dashboard" element={< WorkshopDash />} />
              <Route path="/workshop/nuevaorden" element={<WorkOrderForm />} />
              <Route path="/empleados" element={<SeleccionSucursal />} />
            <Route path="/empleados/sucursal/:sucursalId" element={<ListaEmpleados />} />
            <Route path="/empleados/nuevo" element={<FormularioEmpleado />} />
            <Route path="/empleados/editar/:id" element={<FormularioEmpleado />} />
            {/*</Route>*/}
          </Routes>
        </BrowserRouter>
      </WorkshopProvider>
    </AuthProvider>
  )
}
export default App;