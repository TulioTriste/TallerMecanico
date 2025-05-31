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
import { DarkModeProvider } from "./context/darkModeContext";

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <WorkshopProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/RecoverPassword" element={<RecoverPasswordPage />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/workshops"element={<Workshops />} />
                  <Route path="/workshop/dashboard/:id" element={< WorkshopDash />} />
                  <Route path="/workshop/nuevaorden" element={<WorkOrderForm />} />
                </Route>
              </Routes>
            </BrowserRouter>
        </WorkshopProvider>
      </AuthProvider>
    </DarkModeProvider>
  )
}
export default App;