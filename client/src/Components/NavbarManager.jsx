import { useAuth } from "../context/authContext";
import PublicNavbar from "./NavbarPrincipal/PublicNavbar";
import PrivateNavbar from "./NavbarPrincipal/PrivateNavbar";
import NoPlanNavbar from "./NavbarPrincipal/noplanNavbar";
import { useLocation } from "react-router-dom";

export default function NavbarManager() {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (location.pathname.startsWith("/order")) return null;

  if (isAuthenticated && user) {
    if (
      user.userType === "usuario" &&
      (user.plan_id == null || user.plan_id === 0)
    ) {
      return <NoPlanNavbar />;
    }
    // Si es empleado o cualquier otro usuario autenticado
    return <PrivateNavbar />;
  }
  // Usuario no autenticado
  return <PublicNavbar />;
}
