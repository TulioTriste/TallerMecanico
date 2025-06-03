import { useAuth } from "../context/authContext";
import PublicNavbar from "./NavbarPrincipal/PublicNavbar";
import PrivateNavbar from "./NavbarPrincipal/PrivateNavbar";

export default function NavbarManager() {
  const { isAuthenticated } = useAuth();
  console.log('Estado de autenticación:', isAuthenticated);

  return isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />;
}