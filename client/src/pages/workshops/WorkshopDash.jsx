import {useEffect, useState} from "react";
import {
  AlertCircle,
  Calendar,
  Clipboard,
  Clock,
  DollarSign,
  MoreVertical,
  Phone,
  Plus,
  Users,
  Zap,
} from "lucide-react";
import {Link, useParams} from "react-router-dom";
import {useWorkshop} from "../../context/workshopContext.jsx";
import {useDarkMode} from "../../context/darkModeContext.jsx";
import {useControlPanel} from "../../context/controlPanelContext.jsx";
import {useCliente} from "../../context/clienteContext.jsx";
import {formatFechaDDMMYYYY, formatFechaHHMM,} from "../../utilities/stringFormatter.js";
import {useVehiculo} from "../../context/vehiculoContext.jsx";

const WorkshopDash = () => {
  const {darkMode} = useDarkMode();

  const {id} = useParams();
  const [taller, setTaller] = useState(null);
  const {getTaller} = useWorkshop();
  const {
    getOrdenesDeTrabajoCountByEstado,
    getOtsRecientes,
    getCountOTMes,
    getIngresosDelMes,
    getCitasHoy,
  } = useControlPanel();
  const {getClienteName} = useCliente();
  const {getVehiculoName} = useVehiculo();
  const [otCount, setOtCount] = useState(0);
  const [otMesCount, setOtMesCount] = useState(0);
  const [otRecents, setOtRecents] = useState([]);
  const [citasHoy, setCitasHoy] = useState([]);
  const [ingresosMes, setIngresosMes] = useState(0);

  const loadTaller = async () => {
    try {
      const taller = await getTaller(id);
      setTaller(taller);
    } catch (error) {
      console.error("Error al cargar el taller:", error);
      setTaller(null);
    }
  };

  const loadStats = async () => {
    try {
      const ordenesCount = await getOrdenesDeTrabajoCountByEstado(id, 2); // Estado 2 es "en_proceso"
      setOtCount(ordenesCount);

      const otMesCount = await getCountOTMes(id);
      setOtMesCount(otMesCount);

      const ingresos = await getIngresosDelMes(id);
      setIngresosMes(ingresos);
    } catch (error) {
      console.error("Error al cargar las estadísticas:", error);
    }
  };

  const loadRecentOTs = async () => {
    try {
      const recentOTs = await getOtsRecientes(id, 7); // El numero es la cantidad de días
      const recentOTsWithChanges = await Promise.all(
        recentOTs.map(async (orden) => {
          const nombre = await getClienteName(orden.cliente_rut);
          const vehiculoName = await getVehiculoName(orden.vehiculo_patente);
          return {...orden, cliente: nombre, vehiculo: vehiculoName};
        }),
      );
      setOtRecents(recentOTsWithChanges);
    } catch (error) {
      console.error("Error al cargar las órdenes recientes:", error);
      setOtRecents([]);
    }
  };

  const loadCitasHoy = async () => {
    try {
      const citasCargadas = await getCitasHoy(id);

      setCitasHoy(citasCargadas);
    } catch (error) {
      console.error("Error al cargar las citas de hoy:", error);
      setCitasHoy([]);
    }
  };

  useEffect(() => {
    loadTaller();
    loadStats();
    loadRecentOTs();
    loadCitasHoy();
  }, []);

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

  if (!taller) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span>Cargando taller...</span>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pt-16 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header Simplificado */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-end space-x-4">
          {/* Botón para ver todas las órdenes */}
          <Link
            to={`/workshop/orders/${taller.taller_id}`}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            } transition-colors`}
          >
            <Clipboard className="w-4 h-4"/>
            Todas las Órdenes
          </Link>

          <Link
            to={`/workshop/sucursal/${taller.taller_id}/empleados`}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              darkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            } transition-colors`}
          >
            <Users className="w-4 h-4"/>
            Gestionar Empleados
          </Link>
          <Link
            to={`/workshop/sucursal/${taller.taller_id}/nuevaorden`}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            } transition-colors`}
          >
            <Plus className="w-4 h-4"/>
            Nueva Orden
          </Link>
        </div>
      </div>

      {/* Fondo decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${
            darkMode ? "bg-blue-900/5" : "bg-blue-100/20"
          } blur-3xl`}
        ></div>
        <div
          className={`absolute top-1/2 -left-48 w-96 h-96 rounded-full ${
            darkMode ? "bg-indigo-900/5" : "bg-indigo-100/20"
          } blur-3xl`}
        ></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div
            className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Órdenes Activas
                </p>
                <p
                  className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}
                >
                  {otCount}
                </p>
              </div>
              <Clipboard
                className={`h-8 w-8 ${darkMode ? "text-green-400" : "text-green-600"}`}
              />
            </div>
          </div>

          <div
            className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Ordenes De Trabajo del Mes
                </p>
                <p
                  className={`text-2xl font-bold ${darkMode ? "text-orange-400" : "text-orange-600"}`}
                >
                  {otMesCount}
                </p>
              </div>
              <Users
                className={`h-8 w-8 ${darkMode ? "text-orange-400" : "text-orange-600"}`}
              />
            </div>
          </div>

          <div
            className={`p-6 rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Ingresos de Junio
                </p>
                <p
                  className={`text-2xl font-bold ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}
                >
                  ${ingresosMes.toLocaleString()}
                </p>
              </div>
              <DollarSign
                className={`h-8 w-8 ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}
              />
            </div>
          </div>
        </div>

        {/* Contenido principal en dos columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Órdenes recientes */}
          <div className="lg:col-span-2">
            <div
              className={`rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Órdenes de Trabajo Recientes
                  </h3>
                  <Link
                    to={`/workshop/orders/${taller.taller_id}`}
                    className={`text-sm ${darkMode ? "text-blue-400" : "text-blue-600"} hover:opacity-80`}
                  >
                    Ver todas
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {otRecents.map((orden) => (
                    <div
                      key={orden.ot_id}
                      className={`p-4 rounded-lg border ${darkMode ? "border-gray-700 bg-gray-700/30" : "border-gray-200 bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getEstadoColor(orden.estado_id)}`}
                          >
                            {getEstadoTexto(orden.estado_id)}
                          </div>
                          <span
                            className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                          >
                            ORD-{orden.ot_id}
                          </span>
                        </div>
                        <button
                          className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600`}
                        >
                          <MoreVertical className="w-4 h-4"/>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p
                            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            Cliente
                          </p>
                          <p
                            className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                          >
                            {orden.cliente}
                          </p>
                          <p
                            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            {orden.vehiculo}
                          </p>
                        </div>

                        <div>
                          <p
                            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            Servicio
                          </p>
                          <p
                            className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                          >
                            {orden.descripcion}
                          </p>
                          <p
                            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            Técnico: {orden.tecnico}
                          </p>
                        </div>

                        <div>
                          <p
                            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            Horario
                          </p>
                          <p
                            className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                          >
                            {formatFechaDDMMYYYY(orden.fecha_entrada)}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="w-3 h-3 text-blue-500"/>
                            <span
                              className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              Est. {formatFechaDDMMYYYY(orden.fecha_salida)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Citas próximas */}
          <div className="space-y-8">
            {/* Citas de hoy */}
            <div
              className={`rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Citas de Hoy
                  </h3>
                  <Calendar
                    className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {citasHoy.map((cita) => (
                    <div
                      key={cita.cita_id}
                      className={`p-4 rounded-lg ${darkMode ? "bg-gray-700/30" : "bg-gray-50"}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm font-medium ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                        >
                          {formatFechaHHMM(cita.hora)}
                        </span>
                        <button
                          className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600`}
                        >
                          <Phone className="w-4 h-4"/>
                        </button>
                      </div>

                      <p
                        className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {cita.nombre_cliente}
                      </p>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {cita.nombre_vehiculo}
                      </p>
                      <p
                        className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                      >
                        {cita.descripcion}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full mt-4 py-2 px-4 rounded-lg border-2 border-dashed ${darkMode ? "border-gray-600 text-gray-400 hover:border-gray-500" : "border-gray-300 text-gray-600 hover:border-gray-400"} transition-colors`}
                >
                  + Agendar nueva cita
                </button>
              </div>
            </div>

            {/* Alertas rápidas */}
            <div
              className={`rounded-xl ${darkMode ? "bg-gray-800" : "bg-white"} shadow-sm`}
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Alertas
                  </h3>
                  <AlertCircle
                    className={`h-5 w-5 ${darkMode ? "text-orange-400" : "text-orange-500"}`}
                  />
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3">
                  <div
                    className={`p-3 rounded-lg ${darkMode ? "bg-yellow-900/20 border border-yellow-800" : "bg-yellow-50 border border-yellow-200"}`}
                  >
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-yellow-600"/>
                      <span
                        className={`text-sm ${darkMode ? "text-yellow-300" : "text-yellow-800"}`}
                      >
                        Orden ORD-001 se está retrasando
                      </span>
                    </div>
                  </div>

                  <div
                    className={`p-3 rounded-lg ${darkMode ? "bg-blue-900/20 border border-blue-800" : "bg-blue-50 border border-blue-200"}`}
                  >
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-blue-600"/>
                      <span
                        className={`text-sm ${darkMode ? "text-blue-300" : "text-blue-800"}`}
                      >
                        Nueva cotización pendiente
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopDash;
