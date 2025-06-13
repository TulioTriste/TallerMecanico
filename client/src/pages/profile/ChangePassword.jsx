import {useState} from "react";
import {Eye, EyeOff, Lock} from "lucide-react";
import {useDarkMode} from "../../context/darkModeContext.jsx";

export default function ChangePassword() {
  const {darkMode} = useDarkMode();
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí irá la lógica para cambiar la contraseña
    console.log("Cambio de contraseña:", formData);
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div
      className={`min-h-screen pt-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Cambiar Contraseña</h1>
          <p className={`mt-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Actualiza tu contraseña de acceso
          </p>
        </div>

        {/* Formulario */}
        <div
          className={`${
            darkMode ? "bg-gray-800" : "bg-white"
          } rounded-xl shadow-lg p-6`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contraseña Actual */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Contraseña Actual
              </label>
              <div
                className={`flex rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center pl-4">
                  <Lock
                    className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type={showPassword.current ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                  className={`w-full py-3 px-4 bg-transparent focus:outline-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  placeholder="Ingresa tu contraseña actual"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("current")}
                  className="px-4"
                >
                  {showPassword.current ? (
                    <EyeOff
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  ) : (
                    <Eye
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Nueva Contraseña */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Nueva Contraseña
              </label>
              <div
                className={`flex rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center pl-4">
                  <Lock
                    className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type={showPassword.new ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({...formData, newPassword: e.target.value})
                  }
                  className={`w-full py-3 px-4 bg-transparent focus:outline-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  placeholder="Ingresa tu nueva contraseña"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("new")}
                  className="px-4"
                >
                  {showPassword.new ? (
                    <EyeOff
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  ) : (
                    <Eye
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Confirmar Nueva Contraseña */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Confirmar Nueva Contraseña
              </label>
              <div
                className={`flex rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center pl-4">
                  <Lock
                    className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                </div>
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`w-full py-3 px-4 bg-transparent focus:outline-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  placeholder="Confirma tu nueva contraseña"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility("confirm")}
                  className="px-4"
                >
                  {showPassword.confirm ? (
                    <EyeOff
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  ) : (
                    <Eye
                      className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Botón de Submit */}
            <div>
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg font-medium ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                Actualizar Contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
