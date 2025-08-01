import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Building, Calendar, Camera, Lock, Mail, Phone, Save, Shield, User,} from "lucide-react";

import {useAuth} from "../../context/authContext.jsx";
import {useDarkMode} from "../../context/darkModeContext.jsx";

export default function ProfilePage() {
  const {user, updateProfileUser} = useAuth();
  const navigate = useNavigate();
  const {darkMode} = useDarkMode();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: user?.nombre || "",
    apellido: user?.apellido || "",
    correo: user?.correo || "",
    telefono: user?.telefono || "",
    created_at: user?.created_at || new Date().toISOString().split("T")[0],
  });
  const planes = {
    1: "Plan Básico",
    2: "Plan Profesional",
    3: "Plan Premium",
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const updated = await updateProfileUser({
        usuario_rut: user?.rut,
        nombre: formData.nombre,
        apellido: formData.apellido,
        telefono: formData.telefono,
      });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`min-h-screen pt-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Mi Perfil</h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Gestiona tu información personal y preferencias
          </p>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna Izquierda - Foto y Estado */}
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-xl shadow-lg p-6`}
          >
            <div className="text-center">
              <div className="relative inline-block">
                <div
                  className={`w-32 h-32 rounded-full mx-auto overflow-hidden ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  {user?.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Foto de perfil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-16 h-16 text-gray-400"/>
                    </div>
                  )}
                </div>
                <button
                  className={`absolute bottom-0 right-0 p-2 rounded-full ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  <Camera className="w-5 h-5"/>
                </button>
              </div>
              <h2 className="mt-4 text-xl font-semibold">{user?.nombre} {user?.apellido}</h2>
              <p
                className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                {user?.correo}
              </p>
              <div
                className={`mt-4 px-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-green-900/30 text-green-400"
                    : "bg-green-100 text-green-800"
                }`}
              >
                Cuenta Activa
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <Shield className="w-5 h-5 mr-3 text-blue-500"/>
                    <div>
                      <p className="text-sm font-medium">Plan Actual</p>
                      <p
                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {planes[user?.plan_id] || "Sin Plan"}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-lg ${
                    darkMode ? "bg-gray-700/50" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-blue-500"/>
                    <div>
                      <p className="text-sm font-medium">Miembro desde</p>
                      <p
                        className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {new Date(formData.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Botón Cambiar Contraseña */}
                <button
                  onClick={() => navigate("/profile/change-password")}
                  className={`w-full p-4 rounded-lg flex items-center justify-center ${
                    darkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <Lock className="w-5 h-5 mr-2"/>
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>

          {/* Columna Derecha - Formulario */}
          <div
            className={`lg:col-span-2 ${
              darkMode ? "bg-gray-800" : "bg-white"
            } rounded-xl shadow-lg p-6`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Información Personal</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {isEditing ? "Cancelar" : "Editar"}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Nombre */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Nombre
                  </label>
                  <div
                    className={`flex rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    } ${isEditing ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <div className="flex items-center pl-4">
                      <User
                        className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({...formData, nombre: e.target.value})
                      }
                      disabled={!isEditing}
                      className={`w-full py-3 px-4 bg-transparent focus:outline-none ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    />
                  </div>
                </div>

                {/* Apellido */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Apellido
                  </label>
                  <div
                    className={`flex rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    } ${isEditing ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <div className="flex items-center pl-4">
                      <User
                        className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.apellido}
                      onChange={(e) =>
                        setFormData({...formData, apellido: e.target.value})
                      }
                      disabled={!isEditing}
                      className={`w-full py-3 px-4 bg-transparent focus:outline-none ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Correo Electrónico
                  </label>
                  <div
                    className={`flex rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center pl-4">
                      <Mail
                        className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      />
                    </div>
                    <input
                      type="email"
                      value={formData.correo}
                      disabled
                      className={`w-full py-3 px-4 bg-transparent focus:outline-none ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Teléfono
                  </label>
                  <div
                    className={`flex rounded-lg ${
                      darkMode ? "bg-gray-700" : "bg-gray-50"
                    } ${isEditing ? "ring-2 ring-blue-500" : ""}`}
                  >
                    <div className="flex items-center pl-4">
                      <Phone
                        className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      />
                    </div>
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) =>
                        setFormData({...formData, telefono: e.target.value})
                      }
                      disabled={!isEditing}
                      className={`w-full py-3 px-4 bg-transparent focus:outline-none ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center"
                    >
                      <Save className="w-5 h-5 mr-2"/>
                      Guardar Cambios
                    </button>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
