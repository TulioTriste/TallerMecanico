import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  Moon,
  Sun,
  Search
} from 'lucide-react';
import { useEmpleado } from '../../context/empleadosContext.jsx';
import {useDarkMode} from "../../context/darkModeContext.jsx";

export default function ListaEmpleados() {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { darkMode } = useDarkMode();

  const { getEmpleadosByTaller, deleteEmpleado } = useEmpleado();
  const [empleados, setEmpleados] = useState([]);

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
              <UserPlus className="w-5 h-5 mr-2" />
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
                      onClick={() =>
                        (window.location.href = `/empleados/editar/${empleado.id}`)
                      }
                      className={`inline-flex items-center p-2 rounded-lg mr-2 ${
                        darkMode
                          ? "text-blue-400 hover:bg-blue-900"
                          : "text-blue-600 hover:bg-blue-100"
                      }`}
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={async () => {
                        if (window.confirm('¿Estás seguro de eliminar este empleado?')) {
                          {
                            await deleteEmpleado({ empleado_rut: empleado.empleado_rut });
                            fetchEmpleados();
                          }
                        }
                      }}
                      className={`inline-flex items-center p-2 rounded-lg ${
                        darkMode
                          ? "text-red-400 hover:bg-red-900"
                          : "text-red-600 hover:bg-red-100"
                      }`}
                    >
                      <Trash2 className="w-5 h-5" />
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
                  onClick={() =>
                    (window.location.href = `/empleados/editar/${empleado.id}`)
                  }
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? "text-blue-400 hover:bg-blue-900"
                      : "text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    if (
                      window.confirm("¿Estás seguro de eliminar este empleado?")
                    ) {
                      // Lógica para eliminar
                    }
                  }}
                  className={`p-2 rounded-lg ${
                    darkMode
                      ? "text-red-400 hover:bg-red-900"
                      : "text-red-600 hover:bg-red-100"
                  }`}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
