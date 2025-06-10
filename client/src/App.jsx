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
import NavbarManager from "./Components/NavbarManager";
import ProfilePage from "./Pages/Profile";
import { ClienteProvider } from "./context/clienteContext";
import { VehiculoProvider } from "./context/vehiculoContext";
import CreateWorkshop from "./Pages/CreateWorkshop";
import { EmpleadoProvider } from "./context/empleadosContext";
import VehicleDetails from "./Pages/VehicleDetails";
import Settings from "./Pages/Settings";
import { ThemeWrapper } from "./Components/ThemeWrapper";
import WorkOrders from "./Pages/WorkOrders";
import RecoverPasswordApprovePage from "./Pages/RecoverPasswordApproved.jsx";

function App() {
  return (
    <DarkModeProvider>
      <ThemeWrapper>
        <BrowserRouter>
          <AuthProvider>
            <WorkshopProvider>
              <ControlPanelProvider>
                <ClienteProvider>
                  <VehiculoProvider>
                    <EmpleadoProvider>
                      <div className="min-h-screen">
                        <NavbarManager />
                        <Routes>
                          {/* Rutas públicas */}
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/register" element={<RegisterPage />} />
                          <Route
                            path="/recoverpassword"
                            element={<RecoverPasswordPage />}
                          />
                          <Route
                              path="/newpassword"
                              element={<RecoverPasswordApprovePage />}
                          />
                          <Route path="/plans" element={<PlansPage />} />

                          {/* Rutas protegidas */}
                          <Route element={<ProtectedRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/workshops" element={<Workshops />} />
                            <Route
                              path="/workshop/dashboard/:id"
                              element={<WorkshopDash />}
                            />
                            <Route
                              path="/workshop/sucursal/:id/nuevaorden"
                              element={<WorkOrderForm />}
                            />
                            <Route
                              path="/sucursal"
                              element={<SeleccionSucursal />}
                            />
                            <Route
                              path="/workshop/sucursal/:id/empleados"
                              element={<ListaEmpleados />}
                            />
                            <Route
                              path="/workshop/sucursal/:id/nuevo"
                              element={<FormularioEmpleado />}
                            />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route
                              path="/workshop/create"
                              element={<CreateWorkshop />}
                            />
                            <Route
                              path="/vehicle/:orderId"
                              element={<VehicleDetails />}
                            />
                            <Route path="/settings" element={<Settings />} />
                            <Route
                              path="/workshop/orders/:id"
                              element={<WorkOrders />}
                            />
                          </Route>
                        </Routes>
                      </div>
                    </EmpleadoProvider>
                  </VehiculoProvider>
                </ClienteProvider>
              </ControlPanelProvider>
            </WorkshopProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeWrapper>
    </DarkModeProvider>
  );
}

export default App;
