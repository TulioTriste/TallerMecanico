import React, {useEffect, useState} from "react";

import {Calendar, Check, Clipboard, Clock, DollarSign, MoreVertical, Phone, Plus, Users, X,} from "lucide-react";
import {useWorkshop} from "../../context/workshopContext.jsx";
import {useDarkMode} from "../../context/darkModeContext.jsx";
import {useControlPanel} from "../../context/controlPanelContext.jsx";
import {useCliente} from "../../context/clienteContext.jsx";
import {useVehiculo} from "../../context/vehiculoContext.jsx";
import StringFormatter from "../../utilities/stringFormatter.js";
import {Link, useParams} from "react-router-dom";
import DateUtil from "../../utilities/dateUtil.js";

export default function WorkshopDash() {
  const {darkMode} = useDarkMode();
  const {id} = useParams();
  const {getClienteByRut, createCliente} = useCliente();
  const {getVehiculoByPatente, createVehiculo} = useVehiculo();

  const [dateRange, setDateRange] = useState({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  // Estados para el modal de citas
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    cliente_rut: "",
    cliente_nombre: "",
    cliente_correo: "",
    cliente_telefono: "",
    vehiculo_patente: "",
    vehiculo_marca: "",
    vehiculo_modelo: "",
    vehiculo_anio: "",
    vehiculo_color: "",
    hora: "",
    descripcion: "",
  });

  // Estados existentes
  const [taller, setTaller] = useState(null);
  const {getTaller} = useWorkshop();
  const {
    getOrdenesDeTrabajoCountByEstado,
    getCountOTMes,
    getIngresosDelMes,
    getCitasHoy,
    addCita,
    getOtsByTallerId,
  } = useControlPanel();
  const {getClienteName} = useCliente();
  const {getVehiculoName} = useVehiculo();
  const [otCount, setOtCount] = useState(0);
  const [otMesCount, setOtMesCount] = useState(0);
  const [allOts, setAllOts] = useState([]);
  let [ots, setOts] = useState([]);
  const [citasHoy, setCitasHoy] = useState([]);
  const [ingresosMes, setIngresosMes] = useState(0);
  const [openMenuId, setOpenMenuId] = useState(null);

  // Funciones existentes
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
      const ordenesCount = await getOrdenesDeTrabajoCountByEstado(id, 2);
      setOtCount(ordenesCount);

      const otMesCount = await getCountOTMes(id);
      setOtMesCount(otMesCount);

      const ingresos = await getIngresosDelMes(id);
      setIngresosMes(ingresos);
    } catch (error) {
      console.error("Error al cargar las estadísticas:", error);
    }
  };

  const loadOtsByTaller = async () => {
    try {
      const ordenes = await getOtsByTallerId(id);
      const ordenesConCambios = await Promise.all(
        ordenes.map(async (orden) => {
          const nombre = await getClienteName(orden.cliente_rut);
          const vehiculoName = await getVehiculoName(orden.vehiculo_patente);
          return {...orden, cliente: nombre, vehiculo: vehiculoName};
        }),
      );
      setAllOts(ordenesConCambios);
      await filterOTsByDate();
      setOts(ordenesConCambios);
    } catch (error) {
      console.error("Error al cargar las órdenes de trabajo:", error);
      return [];
    }
  }

  const loadCitasHoy = async () => {
    try {
      const citasCargadas = await getCitasHoy(id);
      setCitasHoy(citasCargadas);
    } catch (error) {
      console.error("Error al cargar las citas de hoy:", error);
      setCitasHoy([]);
    }
  };

  // Función para validar RUT chileno
  const validateRut = (rut) => {
    // Expresión regular para validar el formato XX.XXX.XXX-X
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
    return rutRegex.test(rut);
  };

  // Nueva función para manejar el envío de citas
  const handleSubmitAppointment = async (e) => {
    e.preventDefault();
    try {
      if (!validateRut(newAppointment.cliente_rut)) {
        alert("El RUT ingresado no es válido. Por favor, verifica el formato.");
        return;
      }

      await createCliente({
        cliente_rut: newAppointment.cliente_rut,
        nombre: newAppointment.cliente_nombre,
        correo: newAppointment.cliente_correo,
        telefono: newAppointment.cliente_telefono,
      });

      await createVehiculo({
        patente: newAppointment.vehiculo_patente,
        marca: newAppointment.vehiculo_marca,
        modelo: newAppointment.vehiculo_modelo,
        anio: newAppointment.vehiculo_anio,
        color: newAppointment.vehiculo_color,
        cliente_rut: newAppointment.cliente_rut,
      });

      const response = await addCita(taller.taller_id, newAppointment);
      if (!response) {
        alert("Error al añadir la cita. Por favor, intenta nuevamente.");
        return;
      }

      setShowNewAppointmentModal(false);
      setShowSuccess(true);
      await loadCitasHoy(); // Recargar las citas después de añadir una nueva

      // Limpiar el formulario
      setNewAppointment({
        cliente_rut: "",
        cliente_nombre: "",
        cliente_correo: "",
        cliente_telefono: "",
        vehiculo_patente: "",
        vehiculo_marca: "",
        vehiculo_modelo: "",
        vehiculo_anio: "",
        vehiculo_color: "",
        hora: "",
        descripcion: "",
      });

      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error al crear la cita:", error);
    }
  };

  const filterOTsByDate = () => {
    if (!dateRange.from && !dateRange.to) return allOts;

    ots = allOts;

    return ots.filter((orden) => {
      const fecha = new Date(orden.fecha_entrada); // O usa fecha_salida si prefieres
      const from = dateRange.from ? new Date(dateRange.from) : null;
      const to = dateRange.to ? new Date(dateRange.to) : null;
      if (from && fecha < from) return false;
      if (to) {
        to.setHours(23, 59, 59, 999);
        if (fecha > to) return false;
      }
      return true;
    });
  };

  useEffect(() => {
    loadTaller();
    loadStats();
    loadOtsByTaller();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.endsWith("_rut")) {
      setNewAppointment((prev) => ({
        ...prev,
        [name]: StringFormatter.formatRut(value),
      }));
    } else if (name === "vehiculo_patente") {
      // Convertir a mayúsculas la patente
      setNewAppointment((prev) => ({
        ...prev,
        [name]: value.toUpperCase(),
      }));
    } else {
      setNewAppointment((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleBlur = async (e) => {
    if (e.target.name.startsWith("cliente_")) {
      const response = await getClienteByRut(e.target.value);
      if (response) {
        setNewAppointment((prev) => ({
          ...prev,
          cliente_nombre: response.nombre,
          cliente_correo: response.correo,
          cliente_telefono: response.telefono,
        }));

        alert("El cliente ha sido encontrado y sus datos han sido cargados automáticamente.");
      }
    }
    else if (e.target.name.startsWith("vehiculo_")) {
      const response = await getVehiculoByPatente(e.target.value);
      if (response) {
        setNewAppointment((prev) => ({
          ...prev,
          vehiculo_marca: response.marca,
          vehiculo_modelo: response.modelo,
          vehiculo_anio: response.anio,
          vehiculo_color: response.color,
        }));

        alert("El vehículo ha sido encontrado y sus datos han sido cargados automáticamente.");
      }
    }
  };

  if (!taller) {
    return (
      <div
        className={`min-h-screen pt-16 flex items-center justify-center ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div
            className={`w-12 h-12 border-4 border-t-blue-500 ${
              darkMode ? "border-gray-700" : "border-gray-200"
            } rounded-full animate-spin`}
          ></div>
          <span
            className={`text-lg font-medium ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Cargando taller...
          </span>
        </div>
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

      {/* Modal de Nueva Cita */}
      {showNewAppointmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div
            className={`rounded-xl p-6 max-w-md w-full ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Añadir Cita</h3>
              <button
                onClick={() => setShowNewAppointmentModal(false)}
                className="p-2 hover:bg-gray-200 rounded-full dark:hover:bg-gray-700"
              >
                <X className="w-5 h-5"/>
              </button>
            </div>

            <form onSubmit={handleSubmitAppointment} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1">
                {/* RUT Cliente */}
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  RUT Cliente
                </label>
                <input type="text" value={newAppointment.cliente_rut}
                       name="cliente_rut"
                       onChange={handleInputChange}
                       onBlur={handleBlur}
                       className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                       placeholder="12.345.678-9" required/>
              </div>
              <div className="col-span-1">
                {/* Nombre Cliente */}
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Nombre Completo Cliente
                </label>
                <input type="text" value={newAppointment.cliente_nombre}
                       name="cliente_nombre"
                       onChange={handleInputChange}
                       className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                       placeholder="Nombre Completo del Cliente" required/>
              </div>
              <div className="col-span-1">
                {/* Correo Cliente */}
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Correo Cliente
                </label>
                <input type="text" value={newAppointment.cliente_correo}
                       name="cliente_correo"
                       onChange={handleInputChange}
                       className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                       placeholder="correo@gmail.com" required/>
              </div>
              <div className="col-span-1">
                {/* Teléfono Cliente */}
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Teléfono Cliente
                </label>
                <input type="text" value={newAppointment.cliente_telefono}
                       name="cliente_telefono"
                       onChange={handleInputChange}
                       className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                       required/>
              </div>
              <div className="col-span-1">
                {/* Patente */}
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Patente
                </label>
                <input type="text" value={newAppointment.vehiculo_patente}
                       name="vehiculo_patente"
                       onChange={handleInputChange}
                       onBlur={handleBlur}
                       className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                       placeholder="ABCD12" required/>
              </div>
              <div className="col-span-1">
                {/* Marca Vehículo */}
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Marca Vehículo
                </label>
                <input type="text" value={newAppointment.vehiculo_marca}
                       name="vehiculo_marca"
                       onChange={handleInputChange}
                       className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                       required/>
              </div>
              <div className="col-span-1">
                {/* Modelo Vehículo */}
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Modelo Vehículo
                </label>
                <input type="text" value={newAppointment.vehiculo_modelo}
                       name="vehiculo_modelo"
                       onChange={handleInputChange}
                       className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                       required/>
              </div>
              <div className="col-span-1">
                {/* Año Vehículo */}
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Año Vehículo
                </label>
                <input type="number" value={newAppointment.vehiculo_anio}
                       name="vehiculo_anio"
                       onChange={handleInputChange}
                       className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                       required/>
              </div>
              <div className="col-span-1">
                {/* Color Vehículo */}
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Color Vehículo
                </label>
                <input type="text" value={newAppointment.vehiculo_color}
                       name="vehiculo_color"
                       onChange={handleInputChange}
                       className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                       required/>
              </div>
              <div className="col-span-1">
                {/* Hora */}
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Hora
                </label>
                <input type="datetime-local" value={newAppointment.hora}
                       name="hora"
                       onChange={handleInputChange}
                       className={`w-full p-3 rounded-lg border ${darkMode ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                       required/>
              </div>
              <div className="col-span-2">
                {/* Descripción */}
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Descripción
                </label>
                <textarea value={newAppointment.descripcion}
                          name="descripcion"
                          onChange={handleInputChange}
                          className={`w-full p-3 rounded-lg border min-h-[100px] resize-none ${darkMode ? "bg-gray-700 text-white border-gray-600 focus:border-blue-500" : "bg-gray-100 text-gray-900 border-gray-300 focus:border-blue-500"} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                          placeholder="Descripción del servicio requerido" required/>
              </div>
              <div className="col-span-2 flex justify-end gap-4 mt-6">
                <button type="button"
                        onClick={() => setShowNewAppointmentModal(false)}
                        className={`px-6 py-2 rounded-lg transition-colors ${darkMode ? "bg-gray-700 hover:bg-gray-600 text-gray-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}>
                  Cancelar
                </button>
                <button type="submit"
                        className={`px-6 py-2 rounded-lg transition-colors ${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-500 hover:bg-blue-600"} text-white font-medium`}>
                  Añadir Cita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notificación de éxito */}
      {showSuccess && (
        <div
          initial={{opacity: 0, y: -50}}
          animate={{opacity: 1, y: 20}}
          exit={{opacity: 0, y: -50}}
          className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center z-50"
        >
          <Check className="w-5 h-5 mr-2"/>
          Cita añadida correctamente
        </div>
      )}

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
                {/* Header y filtros en un contenedor flex */}
                <div className="space-y-4">
                  {/* Título y botón "Ver todas" */}
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-lg font-semibold ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Órdenes de Trabajo Ingresadas Recientes
                    </h3>
                    <Link
                      to={`/workshop/orders/${taller.taller_id}`}
                      className={`text-sm ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      } hover:opacity-80`}
                    >
                      Ver todas
                    </Link>
                  </div>

                  {/* Filtros de fecha en una fila */}
                  <div className="flex items-end gap-4">
                    {" "}
                    {/* Cambiado an items-end */}
                    <div>
                      <label
                        className={`block text-xs font-medium mb-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Desde
                      </label>
                      <input
                        type="date"
                        value={DateUtil.formatDateInput(dateRange.from)}
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            from: e.target.value,
                          }))
                        }
                        className={`px-3 py-1.5 text-sm rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-gray-200"
                            : "bg-white border-gray-300 text-gray-700"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-xs font-medium mb-1 ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Hasta
                      </label>
                      <input
                        type="date"
                        value={DateUtil.formatDateInput(dateRange.to)}
                        onChange={(e) =>
                          setDateRange((prev) => ({
                            ...prev,
                            to: e.target.value,
                          }))
                        }
                        className={`px-3 py-1.5 text-sm rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-gray-200"
                            : "bg-white border-gray-300 text-gray-700"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      />
                    </div>
                    {/* Botones */}
                    <div className="flex gap-2">
                      {" "}
                      {/* Eliminado items-center porque ya no es necesario */}
                      <button
                        className={`px-3 py-1.5 text-sm rounded-lg ${
                          darkMode
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-blue-600 hover:bg-blue-700"
                        } text-white transition-colors`}
                        onClick={() => filterOTsByDate()}
                      >
                        Filtrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {ots.map((orden) => (
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
                        <div className="relative">
                          <button
                            className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600`}
                            onClick={() => setOpenMenuId(openMenuId === orden.ot_id ? null : orden.ot_id)}
                          >
                            <MoreVertical className="w-4 h-4"/>
                          </button>
                          {openMenuId === orden.ot_id && (
                            <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg z-50 ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"}`}>
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    window.open(`/workshop/${id}/vehicle/${orden.ot_id}`, '_blank');
                                    setOpenMenuId(null);
                                  }}
                                  className={`w-full text-left px-4 py-2 text-sm ${darkMode ? "text-blue-400 hover:bg-gray-700" : "text-blue-700 hover:bg-gray-100"} flex items-center gap-2`}
                                >
                                  Ver detalles internos (admin)
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
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
                            {StringFormatter.formatFechaDDMMYYYY(
                              orden.fecha_entrada,
                            )}
                          </p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Clock className="w-3 h-3 text-blue-500"/>
                            <span
                              className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                            >
                              Est.{" "}
                              {StringFormatter.formatFechaDDMMYYYY(
                                orden.fecha_salida,
                              )}
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
                  <Link
                    to={`/workshop/${id}/appointments`}
                    className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
                  >
                    <Calendar
                      className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                  </Link>
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
                          {StringFormatter.formatFechaHHMM(cita.hora)}
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

                {/* Botón integrado para agendar nueva cita */}
                <button
                  onClick={() => setShowNewAppointmentModal(true)}
                  className={`w-full mt-4 py-3 px-4 rounded-lg border-2 border-dashed ${
                    darkMode
                      ? "border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
                      : "border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50"
                  } transition-all duration-200 flex items-center justify-center gap-2 group`}
                >
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform"/>
                  Agendar nueva cita
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
