import { useAuth } from "../context/authContext";
import PublicNavbar from "./NavbarPrincipal/PublicNavbar";
import PrivateNavbar from "./NavbarPrincipal/PrivateNavbar";
import { useLocation } from "react-router-dom";

export default function NavbarManager() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Si la ruta comienza con /order, no mostrar navbar
  if (location.pathname.startsWith("/order")) {
    return null;
  }

  // Esperar a que el contexto esté listo antes de mostrar la navbar
  if (loading) {
    return null; // O puedes retornar un loader/spinner si prefieres
  }

  // Si no es ruta /order, mostrar navbar normal
  return isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />;
}
