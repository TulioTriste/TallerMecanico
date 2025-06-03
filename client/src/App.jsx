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
import { DarkModeProvider } from "./context/darkModeContext";
import { ControlPanelProvider } from "./context/controlPanelContext";

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <WorkshopProvider>
          <ControlPanelProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/recoverpassword" element={<RecoverPasswordPage />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/workshops"element={<Workshops />} />
                  <Route path="/workshop/dashboard/:id" element={< WorkshopDash />} />
                  <Route path="/workshop/nuevaorden" element={<WorkOrderForm />} />
                  <Route path="/sucursal" element={<SeleccionSucursal />} />
                  <Route path="/sucursal/:id/empleados" element={<ListaEmpleados />} />
                  <Route path="/sucursal/:id/nuevo" element={<FormularioEmpleado />} />
                  <Route path="/sucursal/:sucursalId/empleados/editar/:empleadoId" element={<FormularioEmpleado />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ControlPanelProvider>
        </WorkshopProvider>
      </AuthProvider>
    </DarkModeProvider>
  )
}
export default App;