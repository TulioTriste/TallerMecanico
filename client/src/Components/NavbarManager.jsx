import { useAuth } from "../context/authContext";
import PublicNavbar from "./NavbarPrincipal/PublicNavbar";
import PrivateNavbar from "./NavbarPrincipal/PrivateNavbar";
import { useLocation } from "react-router-dom"; // Añadir esta importación

export default function NavbarManager() {
  const { isAuthenticated } = useAuth();
  const location = useLocation(); // Añadir esta línea

  // Si la ruta comienza con /order, no mostrar navbar
  if (location.pathname.startsWith("/order")) {
    return null;
  }

  // Si no es ruta /order, mostrar navbar normal
  return isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />;
}
