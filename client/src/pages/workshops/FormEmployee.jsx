import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {CreditCard, Eye, EyeOff, Mail, Phone, UserCog, UserPlus,} from "lucide-react";
import {useDarkMode} from "../../context/darkModeContext.jsx";
import {useForm} from "react-hook-form";
import {useEmpleado} from "../../context/empleadosContext.jsx";
import {useControlPanel} from "../../context/controlPanelContext.jsx";
import StringFormatter from "../../utilities/stringFormatter.js";
import toast from "../../utilities/toast";
import { ToastContainer } from "react-toastify";

export default function FormularioEmpleado() {
  const navigate = useNavigate();
  const {id: tallerId} = useParams(); // Obtener el ID del taller de la URL
  const {darkMode} = useDarkMode();
  const {addEmpleado} = useEmpleado();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {roles} = useControlPanel();

  const {
    register,
    handleSubmit,
    setValue,
    watch
  } = useForm();

  useEffect(() => {
    console.log(roles);
  }, [roles]);

  const onSubmit = async (data) => {
    //e.preventDefault();
    data = {
      taller_id: tallerId,
      ...data
    };

    setLoading(true);
    try {
      if (await addEmpleado(data)) {
        toast.success("Empleado guardado exitosamente", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: darkMode ? "dark" : "light",
        });
        setTimeout(() => {
          navigate(`/workshop/sucursal/${tallerId}/empleados`);
        }, 1500);
      } else {
        toast.error("Error al guardar el empleado", {
          position: "top-center",
          autoClose: 2500,
          theme: darkMode ? "dark" : "light",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al guardar el empleado", {
        position: "top-center",
        autoClose: 2500,
        theme: darkMode ? "dark" : "light",
      });
    } finally {
      setLoading(false);
    }
  };

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
    // Limitar a 9 dígitos (9 + 8 números)
    digits = digits.slice(0, 9);
    // Formato: 9 XXXX XXXX
    let formatted = "";
    if (digits.length > 0) formatted += digits[0];
    if (digits.length > 1) formatted += " " + digits.slice(1, 5);
    if (digits.length > 5) formatted += " " + digits.slice(5, 9);
    setValue("cel", formatted.trim());
  };

  /*const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };*/

  return (
    <div
      className={`min-h-screen pt-16 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex-1">
            <div
              className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
                darkMode ? "bg-blue-900" : "bg-blue-100"
              }`}
            >
              <UserPlus
                className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
              />
            </div>
            <h1
              className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Nuevo Empleado
            </h1>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Ingresa los datos del nuevo empleado
            </p>
          </div>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`rounded-xl shadow-md p-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="space-y-6">
            {/* RUT */}
            <div>
              <label
                className={`block text-sm font-medium mb-1 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                RUT
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <CreditCard
                    className={darkMode ? "text-gray-500" : "text-gray-400"}
                  />
                </div>
                <input
                  type="text"
                  name="empleado_rut"
                  value={watch("empleado_rut")}
                  {...register("empleado_rut")}
                  onChange={handleRutChange}
                  placeholder="Ej: 12.345.678-9"
                  required
                  className={`block w-full pl-10 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>

            {/* Datos personales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  //value={formData.nombre}
                  {...register("nombre")}
                  //onChange={handleInputChange}
                  required
                  className={`block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  //value={formData.apellido}
                  {...register("apellido")}
                  //onChange={handleInputChange}
                  required
                  className={`block w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            </div>

            {/* Contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Correo Electrónico
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Mail
                      className={darkMode ? "text-gray-500" : "text-gray-400"}
                    />
                  </div>
                  <input
                    type="email"
                    name="correo"
                    //value={formData.correo}
                    {...register("correo")}
                    //onChange={handleInputChange}
                    required
                    className={`block w-full pl-10 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Celular
                </label>
                <div className="relative flex items-center">
                  <span className="inline-block px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-l border border-r-0 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 select-none">+56</span>
                  <input
                    type="tel"
                    name="cel"
                    value={watch("cel")}
                    {...register("cel")}
                    onChange={handlePhoneChange}
                    required
                    className={`block w-full rounded-r px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300 text-gray-900"
                    }`}
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
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Rol
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <UserCog
                      className={darkMode ? "text-gray-500" : "text-gray-400"}
                    />
                  </div>
                  <select
                    name="roles_id"
                    //value={formData.roles_id}
                    {...register("roles_id")}
                    //onChange={handleInputChange}
                    required
                    className={`block w-full pl-10 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300 text-gray-900"
                    }`}
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
                <label
                  className={`block text-sm font-medium mb-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    //value={formData.password}
                    {...register("password")}
                    //onChange={handleInputChange}
                    required
                    className={`block w-full pr-10 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "border-gray-300 text-gray-900"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff
                        className={darkMode ? "text-gray-500" : "text-gray-400"}
                      />
                    ) : (
                      <Eye
                        className={darkMode ? "text-gray-500" : "text-gray-400"}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => {
                  navigate(
                    `/workshops/${tallerId}/empleados`,
                  );
                }}
                className={`px-4 py-2 rounded-lg font-medium ${
                  darkMode
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-white font-medium ${
                  darkMode
                    ? "bg-blue-700 hover:bg-blue-800"
                    : "bg-blue-600 hover:bg-blue-700"
                } disabled:opacity-50`}
              >
                {loading ? "Guardando..." : "Guardar Empleado"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
