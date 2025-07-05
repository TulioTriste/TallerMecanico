import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Edit, Search, Trash2, UserPlus, Users, ChevronLeft} from 'lucide-react';
import {useEmpleado} from '../../context/empleadosContext.jsx';
import {useDarkMode} from "../../context/darkModeContext.jsx";
import { useCustomConfirm } from "../../utilities/customConfirm.jsx";
import { Fragment } from "react";
import { CreditCard, Eye, EyeOff, Mail, UserCog } from "lucide-react";
import { useForm } from "react-hook-form";
import StringFormatter from "../../utilities/stringFormatter.js";
import {useControlPanel} from "../../context/controlPanelContext.jsx";

export default function ListaEmpleados() {
  const {id} = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const {darkMode} = useDarkMode();

  const {getEmpleadosByTaller, deleteEmpleado, updateEmpleado} = useEmpleado();
  const [empleados, setEmpleados] = useState([]);
  const { show, ConfirmModal } = useCustomConfirm();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedEmpleado, setSelectedEmpleado] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const { roles } = useControlPanel();
  const { addEmpleado } = useEmpleado(); // Suponiendo que hay un método updateEmpleado

  const fetchEmpleados = async () => {
    try {
      const res = await getEmpleadosByTaller(id);
      setEmpleados(res);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const empleadosOrdenados = [...empleados].sort((a, b) => a.roles_id - b.roles_id);

  const empleadosFiltrados = empleadosOrdenados
    .filter(emp =>
      emp.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.empleado_rut.includes(searchTerm),
    );

  return (
    <div
      className={`min-h-screen pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-gray-50 to-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Flecha hacia atrás */}
        <div className="mb-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-blue-600 hover:underline font-medium mb-2"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Volver
          </button>
        </div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex-1">
            <div
              className={`inline-flex items-center justify-center p-3 rounded-full mb-4 ${
                darkMode ? "bg-blue-900" : "bg-blue-100"
              }`}
            >
              <Users
                className={`w-8 h-8 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
              />
            </div>
            <h1
              className={`text-3xl font-bold mb-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Gestión de Empleados
            </h1>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Administra los empleados del taller
            </p>
          </div>

          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <button
              onClick={() =>
                (window.location.href = `/workshop/sucursal/${id}/nuevo`)
              }
              className={`flex items-center px-4 py-2 rounded-lg text-white font-medium transition-all w-full sm:w-auto justify-center ${
                darkMode
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <UserPlus className="w-5 h-5 mr-2"/>
              Nuevo Empleado
            </button>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search
                className={`w-5 h-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
              />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o RUT..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`block w-full pl-10 pr-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div>
        </div>

        {/* Vista de escritorio */}
        <div className="hidden md:block rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className={darkMode ? "bg-gray-700" : "bg-gray-50"}>
            <tr>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                Empleado
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                RUT
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                Contacto
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                Rol
              </th>
              <th
                scope="col"
                className={`px-6 py-3 text-right text-xs font-medium ${
                  darkMode ? "text-gray-300" : "text-gray-500"
                } uppercase tracking-wider`}
              >
                Acciones
              </th>
            </tr>
            </thead>
            <tbody
              className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-200"}`}
            >
            {empleadosFiltrados.map((empleado) => (
              <tr
                key={empleado.empleado_rut}
                className={darkMode ? "bg-gray-800" : "bg-white"}
              >
                <td
                  className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                        <span className="text-xl">
                          {empleado.nombre.charAt(0).toUpperCase()}{" "}
                          {empleado.apellido.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="ml-4">
                      <div
                        className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {empleado.nombre} {empleado.apellido}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                >
                  {empleado.empleado_rut}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                >
                  <div>{empleado.correo}</div>
                  <div>{empleado.cel}</div>
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap ${darkMode ? "text-gray-300" : "text-gray-500"}`}
                >
                  {empleado.nombre_rol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedEmpleado(empleado);
                      setEditModalOpen(true);
                    }}
                    className={`inline-flex items-center p-2 rounded-lg mr-2 ${
                      darkMode
                        ? "text-blue-400 hover:bg-blue-900"
                        : "text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    <Edit className="w-5 h-5"/>
                  </button>
                  <button
                    onClick={() => {
                      show({
                        title: "¿Eliminar empleado?",
                        message: `¿Estás seguro que quieres eliminar a ${empleado.nombre} ${empleado.apellido}?`,
                        onConfirm: async () => {
                          await deleteEmpleado({empleado_rut: empleado.empleado_rut});
                          fetchEmpleados();
                        }
                      });
                    }}
                    className={`inline-flex items-center p-2 rounded-lg ${
                      darkMode
                        ? "text-red-400 hover:bg-red-900"
                        : "text-red-600 hover:bg-red-100"
                    }`}
                  >
                    <Trash2 className="w-5 h-5"/>
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Vista móvil */}
        <div className="md:hidden space-y-4">
          {empleadosFiltrados.map((empleado) => (
            <div
              key={empleado.empleado_rut}
              className={`rounded-lg shadow-md p-4 ${
                darkMode ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      darkMode ? "bg-gray-700" : "bg-gray-100"
                    }`}
                  >
                    <span className="text-xl">
                      {empleado.nombre.charAt(0).toUpperCase()}{" "}
                      {empleado.apellido.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-3">
                    <div
                      className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {empleado.nombre} {empleado.apellido}
                    </div>
                    <div
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {empleado.nombre_rol}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    RUT
                  </span>
                  <span
                    className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                  >
                    {empleado.empleado_rut}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Correo
                  </span>
                  <span
                    className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                  >
                    {empleado.correo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    Celular
                  </span>
                  <span
                    className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-900"}`}
                  >
                    {empleado.cel}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setSelectedEmpleado(empleado);
                    setEditModalOpen(true);
                  }}
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? "text-blue-400 hover:bg-blue-900"
                      : "text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  <Edit className="w-5 h-5"/>
                </button>
                <button
                  onClick={() => {
                    show({
                      title: "¿Eliminar empleado?",
                      message: `¿Estás seguro que quieres eliminar a ${empleado.nombre} ${empleado.apellido}?`,
                      onConfirm: async () => {
                        await deleteEmpleado({empleado_rut: empleado.empleado_rut});
                        fetchEmpleados();
                      }
                    });
                  }}
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? "text-red-400 hover:bg-red-900"
                      : "text-red-600 hover:bg-red-100"
                  }`}
                >
                  <Trash2 className="w-5 h-5"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ConfirmModal />
      {/* Modal de edición de empleado */}
      <EditEmployeeModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        empleado={selectedEmpleado}
        roles={roles}
        loading={editLoading}
        onSubmit={async (data) => {
          setEditLoading(true);
          const ok = await updateEmpleado({ ...data, taller_id: id });
          setEditLoading(false);
          if (ok) {
            setEditModalOpen(false);
            fetchEmpleados();
          }
        }}
      />
    </div>
  );
}

function EditEmployeeModal({ open, onClose, onSubmit, empleado, roles, loading }) {
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

  const handleRutChange = (e) => {
    const formatted = StringFormatter.formatRut(e.target.value);
    setValue("empleado_rut", formatted);
  };

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
