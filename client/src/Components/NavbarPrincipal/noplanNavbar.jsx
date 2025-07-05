import React from "react";
import { useAuth } from "../../context/authContext";
import logo from "../../assets/logo-taller.png";
import { useNavigate } from "react-router-dom";

export default function NoPlanNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Solo renderiza si el usuario está logueado, es tipo 'usuario' y NO tiene plan activo
  if (
    !user ||
    user.userType !== "usuario" ||
    (user.plan_id !== null && user.plan_id !== 0)
  ) {
    return null;
  }

  return (
    <nav className="w-full bg-white shadow-md px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}> 
        <img src={logo} alt="TallerConectados" className="h-10 w-auto" />
        <span className="font-bold text-xl text-blue-700">TallerConectados</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 font-medium">Sin plan activo</span>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          onClick={() => navigate("/plans")}
        >
          Contratar plan
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-medium transition-colors"
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
