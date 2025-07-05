import { useEffect, useState } from "react";
import { CreditCard, Eye, EyeOff, Mail, UserCog } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDarkMode } from "../../context/darkModeContext.jsx";
import StringFormatter from "../../utilities/stringFormatter.js";

export default function EditEmployeeModal({ open, onClose, onSubmit, empleado, roles, loading }) {
  const { darkMode } = useDarkMode();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset
  } = useForm({ defaultValues: empleado });

  useEffect(() => {
    if (empleado) {
      reset(empleado);
    }
  }, [empleado, reset]);

  // Formateo visual en tiempo real del RUT
  const handleRutChange = (e) => {
    const formatted = StringFormatter.formatRut(e.target.value);
    setValue("empleado_rut", formatted);
  };

  // Formateo visual en tiempo real del teléfono chileno
  const handlePhoneChange = (e) => {
    let digits = e.target.value.replace(/\D/g, "");
    if (digits.startsWith("56")) digits = digits.slice(2);
    if (!digits.startsWith("9")) digits = "9" + digits.replace(/^9+/, "");
    digits = digits.slice(0, 9);
    let formatted = "";
    if (digits.length > 0) formatted += digits[0];
    if (digits.length > 1) formatted += " " + digits.slice(1, 5);
    if (digits.length > 5) formatted += " " + digits.slice(5, 9);
    setValue("cel", formatted.trim());
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`max-w-lg w-full rounded-xl shadow-lg p-8 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>Editar Empleado</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* RUT */}
          <div>
            <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>RUT</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <CreditCard className={darkMode ? "text-gray-500" : "text-gray-400"} />
              </div>
              <input
                type="text"
                name="empleado_rut"
                value={watch("empleado_rut")}
                {...register("empleado_rut")}
                onChange={handleRutChange}
                placeholder="Ej: 12.345.678-9"
                required
                className={`block w-full pl-10 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-gray-900"}`}
              />
            </div>
          </div>
          {/* Nombre y Apellido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Nombre</label>
              <input
                type="text"
                name="nombre"
                {...register("nombre")}
                required
                className={`block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-gray-900"}`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Apellido</label>
              <input
                type="text"
                name="apellido"
                {...register("apellido")}
                required
                className={`block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-gray-900"}`}
              />
            </div>
          </div>
          {/* Correo y Celular */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className={darkMode ? "text-gray-500" : "text-gray-400"} />
                </div>
                <input
                  type="email"
                  name="correo"
                  {...register("correo")}
                  required
                  className={`block w-full pl-10 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-gray-900"}`}
                />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Celular</label>
              <div className="relative flex items-center">
                <span className="inline-block px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-l border border-r-0 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 select-none">+56</span>
                <input
                  type="tel"
                  name="cel"
                  value={watch("cel")}
                  {...register("cel")}
                  onChange={handlePhoneChange}
                  required
                  className={`block w-full rounded-r px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-gray-900"}`}
                  placeholder="9 XXXX XXXX"
                  maxLength={11}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
          {/* Rol y Contraseña */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Rol</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <UserCog className={darkMode ? "text-gray-500" : "text-gray-400"} />
                </div>
                <select
                  name="roles_id"
                  {...register("roles_id")}
                  required
                  className={`block w-full pl-10 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-gray-900"}`}
                >
                  <option value="">Seleccionar rol</option>
                  {roles.map((rol) => (
                    <option key={rol.roles_id} value={rol.roles_id}>
                      {rol.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  {...register("password")}
                  required
                  className={`block w-full pr-10 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300 text-gray-900"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className={darkMode ? "text-gray-500" : "text-gray-400"} />
                  ) : (
                    <Eye className={darkMode ? "text-gray-500" : "text-gray-400"} />
                  )}
                </button>
              </div>
            </div>
          </div>
          {/* Botones */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium ${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-white font-medium ${darkMode ? "bg-blue-700 hover:bg-blue-800" : "bg-blue-600 hover:bg-blue-700"} disabled:opacity-50`}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
