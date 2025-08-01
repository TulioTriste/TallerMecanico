import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RecoverPasswordPage from "./pages/auth/RecoverPasswordPage.jsx";
import Dashboard from "./pages/main/Dashboard.jsx";
import PlansPage from "./pages/main/PlansPage.jsx";
import { AuthProvider, useAuth } from "./context/authContext";
import Workshops from "./pages/workshops/Workshops.jsx";
import WorkshopDash from "./pages/workshops/WorkshopDash.jsx";
import { ProtectedRoute } from "./pages/protected/ProtectedRoute.jsx";
import { WorkshopProvider } from "./context/workshopContext";
import WorkOrderForm from "./pages/workshops/FormNewOt.jsx";
import ListaEmpleados from "./pages/workshops/Employees.jsx";
import FormularioEmpleado from "./pages/workshops/FormEmployee.jsx";
import SeleccionSucursal from "./pages/workshops/SelectSucursal.jsx";
import { DarkModeProvider } from "./context/darkModeContext";
import { ControlPanelProvider } from "./context/controlPanelContext";
import NavbarManager from "./Components/NavbarManager";
import ProfilePage from "./pages/profile/Profile.jsx";
import { ClienteProvider } from "./context/clienteContext";
import { VehiculoProvider } from "./context/vehiculoContext";
import CreateWorkshop from "./pages/workshops/CreateWorkshop.jsx";
import { EmpleadoProvider } from "./context/empleadosContext";
import VehicleDetails from "./pages/workshops/VehicleDetails.jsx";
import Settings from "./pages/profile/Settings.jsx";
import { ThemeWrapper } from "./Components/ThemeWrapper";
import WorkOrders from "./pages/workshops/WorkOrders.jsx";
import RecoverPasswordApprovePage from "./pages/auth/RecoverPasswordApproved.jsx";
import ErrorPage from "./pages/error/ErrorPage.jsx";
import PlanCheckout from "./pages/checkout/PlanCheckout.jsx";
import ClientVehicleDetails from "./pages/client/ClientVehicleDetails.jsx";
import SuccessPage from "./pages/checkout/SuccessPage.jsx";
import Appointments from "./pages/workshops/Appointments.jsx";
import CookieConsent from "./Components/cookies/CookieConsent.jsx";
import AboutSoftware from "./pages/main/AboutSoftware.jsx";
import ChangePassword from "./pages/profile/ChangePassword.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppContent() {
  const { loading } = useAuth();
  if (loading) return null;
  return (
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
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/sobre-software" element={<AboutSoftware />} />
                  <Route path="/recoverpassword" element={<RecoverPasswordPage />} />
                  <Route path="/newpassword" element={<RecoverPasswordApprovePage />} />
                  <Route path="/plans" element={<PlansPage />} />
                  <Route path="/order/:uniqueId" element={<ClientVehicleDetails />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/workshops" element={<Workshops />} />
                    <Route path="/workshop/:id/appointments" element={<Appointments />} />
                    <Route path="/workshop/dashboard/:id" element={<WorkshopDash />} />
                    <Route path="/workshop/sucursal/:id/nuevaorden" element={<WorkOrderForm />} />
                    <Route path="/sucursal" element={<SeleccionSucursal />} />
                    <Route path="/workshop/sucursal/:id/empleados" element={<ListaEmpleados />} />
                    <Route path="/workshop/sucursal/:id/nuevo" element={<FormularioEmpleado />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/workshop/create" element={<CreateWorkshop />} />
                    <Route path="/workshop/:tallerId/vehicle/:orderId" element={<VehicleDetails />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/workshop/orders/:id" element={<WorkOrders />} />
                    <Route path="/checkout" element={<PlanCheckout />} />
                    <Route path="/checkout/success" element={<SuccessPage />} />
                    <Route path="/profile/change-password" element={<ChangePassword />} />
                  </Route>
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
                <CookieConsent />
              </div>
            </EmpleadoProvider>
          </VehiculoProvider>
        </ClienteProvider>
      </ControlPanelProvider>
    </WorkshopProvider>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <ThemeWrapper>
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
            <ToastContainer position="top-right" autoClose={3500} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
          </AuthProvider>
        </BrowserRouter>
      </ThemeWrapper>
    </DarkModeProvider>
  );
}

export default App;
