import { useState, useEffect } from "react";
import {
  MoreVertical,
  Clock,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useWorkshop } from "../../context/workshopContext.jsx";
import { useParams, Link } from "react-router-dom";
import { useDarkMode } from "../../context/darkModeContext.jsx";
import { useControlPanel } from "../../context/controlPanelContext.jsx";
import { useCliente } from "../../context/clienteContext.jsx";
import { useVehiculo } from "../../context/vehiculoContext.jsx";
import StringFormatter from "../../utilities/stringFormatter.js";

export default function WorkOrders() {
  const {darkMode} = useDarkMode();
  const {id} = useParams();
  const { getOtsByTallerId } = useControlPanel();
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const ordenesPerPage = 10;

  useEffect(() => {
    loadOrdenes();
  }, [id, statusFilter]);

  const loadOrdenes = async () => {
    setLoading(true);
    try {
      const response = await getOtsByTallerId(id);

      let ordenesData = Array.isArray(response) ? response : [];
      if (statusFilter !== "all") {
        ordenesData = ordenesData.filter(
          (orden) => orden.estado_id === parseInt(statusFilter),
        );
      }

      setOrdenes(ordenesData);
    } catch (error) {
      console.error("Error al cargar las órdenes:", error);
      setOrdenes([]);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 3:
        return darkMode
          ? "text-green-400 bg-green-900/30"
          : "text-green-700 bg-green-100";
      case 2:
        return darkMode
          ? "text-blue-400 bg-blue-900/30"
          : "text-blue-700 bg-blue-100";
      case 1:
        return darkMode
          ? "text-yellow-400 bg-yellow-900/30"
          : "text-yellow-700 bg-yellow-100";
      default:
        return darkMode
          ? "text-gray-400 bg-gray-800"
          : "text-gray-700 bg-gray-100";
    }
  };

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case 3:
        return "Completado";
      case 2:
        return "En Proceso";
      case 1:
        return "Pendiente";
      default:
        return "Desconocido";
    }
  };

  // Filtrar órdenes por búsqueda
  const filteredOrdenes = Array.isArray(ordenes)
    ? ordenes.filter(
      (orden) =>
        orden.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orden.vehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orden.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    : [];

  // Paginación
  const indexOfLastOrden = currentPage * ordenesPerPage;
  const indexOfFirstOrden = indexOfLastOrden - ordenesPerPage;
  const currentOrdenes = filteredOrdenes.slice(
    indexOfFirstOrden,
    indexOfLastOrden,
  );
  const totalPages = Math.ceil(filteredOrdenes.length / ordenesPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Cargando órdenes...</div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Flecha hacia atrás */}
        <div className="mb-4">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-blue-600 hover:underline font-medium mb-2"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Volver
          </button>
        </div>
        {/* Header con filtros */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Órdenes de Trabajo</h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div
                className={`flex items-center px-4 py-2 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, vehículo o descripción..."
                  className={`ml-2 w-full bg-transparent focus:outline-none ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5"/>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={`px-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-gray-800 text-white border-gray-700"
                    : "bg-white text-gray-900 border-gray-200"
                } border focus:outline-none`}
              >
                <option value="all">Todos los estados</option>
                <option value="1">Pendientes</option>
                <option value="2">En proceso</option>
                <option value="3">Completados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de órdenes */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">Cargando órdenes...</div>
          ) : currentOrdenes.length === 0 ? (
            <div className="text-center py-8">No se encontraron órdenes</div>
          ) : (
            currentOrdenes.map((orden) => (
              <div
                key={orden.ot_id}
                className={`p-6 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow-sm`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(orden.estado_id)}`}
                    >
                      {getEstadoTexto(orden.estado_id)}
                    </div>
                    <span className="text-sm font-medium">
                      ORD-{orden.ot_id}
                    </span>
                  </div>
                  <button
                    className={`p-2 rounded-full hover:${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Cliente
                    </p>
                    <p className="font-medium mt-1">{orden.cliente}</p>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {orden.vehiculo}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Servicio
                    </p>
                    <p className="font-medium mt-1">{orden.descripcion}</p>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Técnico: {orden.tecnico}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Fechas
                    </p>
                    <p className="font-medium mt-1">
                      {StringFormatter.formatFechaDDMMYYYY(orden.fecha_entrada)}
                    </p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-4 h-4 text-blue-500 mr-1" />
                      <span
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Est. {StringFormatter.formatFechaDDMMYYYY(orden.fecha_salida)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Paginación */}
        {!loading && filteredOrdenes.length > 0 && (
          <div className="mt-8 flex justify-center items-center space-x-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-5 h-5"/>
            </button>
            <span
              className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
            >
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-100"
              }`}
            >
              <ChevronRight className="w-5 h-5"/>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
