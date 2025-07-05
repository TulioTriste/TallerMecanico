import { useAuth } from "../context/authContext";
import PublicNavbar from "./NavbarPrincipal/PublicNavbar";
import PrivateNavbar from "./NavbarPrincipal/PrivateNavbar";
import { useLocation } from "react-router-dom";

export default function NavbarManager() {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (location.pathname.startsWith("/order")) return null;

  if (isAuthenticated && user) {
    return <PrivateNavbar />;
  }
  // Usuario no autenticado
  return <PublicNavbar />;
}
