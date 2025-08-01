import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Home, MapPin, Plus, Wrench } from "lucide-react";
import { useWorkshop } from "../../context/workshopContext.jsx";
import { useDarkMode } from "../../context/darkModeContext.jsx";
import { useControlPanel } from "../../context/controlPanelContext.jsx";
import StringFormatter from "../../utilities/stringFormatter.js";
import { MoreVertical, Edit, Trash2 } from "lucide-react";
import { updateTallerRequest } from "../../api/workshops"; // Asegúrate de tener este endpoint
import { useAuth } from "../../context/authContext.jsx";

const Workshops = () => {
  const { darkMode } = useDarkMode();
  const { user } = useAuth();
  // Evita renderizar hasta que el usuario esté cargado
  if (!user) return null;
  const [selectedTaller, setSelectedTaller] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tallerEditData, setTallerEditData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const { workshops, cargarTalleres, deleteTaller } = useWorkshop(); // Datos de ejemplo de los talleres
  const {
    getNextCitaTaller,
    getOrdenesDeTrabajoCountByEstado,
    getCountCitasProx7Dias,
  } = useControlPanel(); // Datos de ejemplo de la próxima cita
  const [nextCitas, setNextCitas] = useState({});
  const [ordenesTrabajo, setOrdenesTrabajo] = useState({});
  const [proxCitas, setProxCitas] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await cargarTalleres(); // Actualiza la próxima cita al cargar los talleres
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Solo cuando los talleres están cargados
    const fetchNextCitas = async () => {
      const citas = {};
      for (const taller of workshops) {
        citas[taller.taller_id] = await getNextCitaTaller(taller.taller_id);
      }
      setNextCitas(citas);
    };
    if (workshops.length > 0) {
      fetchNextCitas();
    }
  }, [workshops, getNextCitaTaller]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (openMenuId && !event.target.closest(".relative")) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  useEffect(() => {
    const fetchStats = async () => {
      const ordenes = {};
      for (const taller of workshops) {
        ordenes[taller.taller_id] = await getOrdenesDeTrabajoCountByEstado(
          taller.taller_id,
          2,
        );
      }
      setOrdenesTrabajo(ordenes);

      const citasProx = {};
      for (const taller of workshops) {
        citasProx[taller.taller_id] = await getCountCitasProx7Dias(taller.taller_id);
      }
      setProxCitas(citasProx);
    };
    if (workshops.length > 0) {
      fetchStats();
    }
  }, [workshops]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (openMenuId && !event.target.closest(".relative")) {
        setOpenMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  const handleTallerSelect = (taller) => {
    setSelectedTaller(taller.taller_id);

    navigate(`/workshop/dashboard/${taller.taller_id}`);
  };

  const getDisponibilidad = (taller) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    // Convierte inicio_jornada y termino_jornada a minutos
    const inicio = taller.inicio_jornada;
    const termino = taller.termino_jornada;

    const inicioHoras = Math.floor(inicio / 100);
    const inicioMinutos = inicio % 100;
    const inicioTotal = inicioHoras * 60 + inicioMinutos;

    const terminoHoras = Math.floor(termino / 100);
    const terminoMinutos = termino % 100;
    const terminoTotal = terminoHoras * 60 + terminoMinutos;

    return currentMinutes >= inicioTotal && currentMinutes <= terminoTotal;
  };

  const eliminarTaller = async (tallerId) => {
    if (user.tipo === "usuario" || user.tipo === "administrador") {
      await deleteTaller(tallerId);
    } else {
      alert("No tienes permisos para eliminar un taller");
    }
  }

  const handleEditClick = (taller) => {
    // Formatea el teléfono de la base de datos (56972196207) a '9 XXXX XXXX' para el input
    let telefono = taller.telefono || '';
    if (telefono.startsWith('56') && telefono.length === 11) {
      telefono = telefono.slice(2); // Quita el 56
      telefono = telefono[0] + ' ' + telefono.slice(1, 5) + ' ' + telefono.slice(5, 9);
    } else {
      telefono = '';
    }
    setTallerEditData({
      ...taller,
      telefono,
      inicio_jornada: intToTime(taller.inicio_jornada),
      termino_jornada: intToTime(taller.termino_jornada),
    });
    setEditModalOpen(true);
    setOpenMenuId(null);
  };

  // Función para formatear el teléfono chileno
  function formatPhone(value) {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("56")) digits = digits.slice(2);
    if (digits.startsWith("9")) digits = digits;
    else if (digits.length > 0) digits = "9" + digits;
    let formatted = "+56 ";
    if (digits.length > 0) formatted += digits[0];
    if (digits.length > 1) formatted += " " + digits.slice(1, 5);
    if (digits.length > 5) formatted += " " + digits.slice(5, 9);
    if (digits.length > 9) formatted += " " + digits.slice(9, 13);
    return formatted.trim();
  }

  function getPhoneDigits(phone) {
    // Extrae solo los dígitos del teléfono
    return phone.replace(/\D/g, "");
  }

  function isValidName(name) {
    return name && name.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g, "").length >= 5;
  }
  function isValidPhone(phone) {
    return /^\+56 9 \d{4} \d{4}$/.test(phone);
  }
  function isValidEmail(email) {
    // Simple email regex
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  }
  function isValidAddress(addr) {
    return addr && addr.trim().length > 0;
  }
  function isValidJornada(inicio, termino) {
    return inicio && termino && Number(inicio) < Number(termino);
  }
  function timeToInt(timeStr) {
    if (!timeStr) return "";
    const [h, m] = timeStr.split(":");
    return parseInt(h) * 100 + parseInt(m);
  }
  function intToTime(val) {
    if (!val) return "";
    let str = val.toString().padStart(4, "0");
    return `${str.slice(0,2)}:${str.slice(2)}`;
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "telefono") {
      setTallerEditData((prev) => ({ ...prev, telefono: formatPhone(value) }));
    } else if (name === "inicio_jornada" || name === "termino_jornada") {
      setTallerEditData((prev) => ({ ...prev, [name]: value }));
    } else {
      setTallerEditData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSave = async () => {
    // Validaciones robustas
    if (!isValidName(tallerEditData.nombre)) {
      setFormError("El nombre debe tener al menos 5 letras.");
      return;
    }
    if (!/^9 \d{4} \d{4}$/.test(tallerEditData.telefono)) {
      setFormError("El teléfono debe tener el formato +56 9 XXXX XXXX");
      return;
    }
    if (!isValidEmail(tallerEditData.correo)) {
      setFormError("Ingrese un correo válido.");
      return;
    }
    if (!isValidAddress(tallerEditData.direccion)) {
      setFormError("La dirección no puede estar vacía.");
      return;
    }
    if (!isValidJornada(timeToInt(tallerEditData.inicio_jornada), timeToInt(tallerEditData.termino_jornada))) {
      setFormError("La jornada debe ser válida y el inicio debe ser menor que el término.");
      return;
    }
    setFormError("");
    setSaving(true);
    try {
      // Extraer solo los dígitos y dejar el formato 569XXXXXXXX
      let telefonoNumerico = tallerEditData.telefono.replace(/\D/g, "");
      telefonoNumerico = "56" + telefonoNumerico;
      await updateTallerRequest(tallerEditData.taller_id, {
        ...tallerEditData,
        telefono: telefonoNumerico,
        inicio_jornada: timeToInt(tallerEditData.inicio_jornada),
        termino_jornada: timeToInt(tallerEditData.termino_jornada),
      });
      setEditModalOpen(false);
      setTallerEditData(null);
      await cargarTalleres();
    } catch (err) {
      setFormError("Error al actualizar taller. Verifica los datos e inténtalo de nuevo.");
    }
    setSaving(false);
  };

  function isNoPlan(plan_id) {
    return (
      plan_id === null ||
      plan_id === undefined ||
      plan_id === 0 ||
      plan_id === "0" ||
      plan_id === "" ||
      plan_id === false ||
      plan_id === "null"
    );
  }

  if (user && user.tipo === "usuario" && isNoPlan(user.plan_id)) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
        <div className="text-center">
          <div className="inline-block bg-red-100 text-red-700 px-6 py-3 rounded-full text-2xl font-bold shadow-md mb-6">
            No tienes ningún plan activo
          </div>
          <p className={`mb-8 text-lg ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Para gestionar tus talleres, primero debes contratar un plan.</p>
          <button
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg shadow transition-colors"
            onClick={() => navigate("/plans")}
          >
            Contrata tu plan acá
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 pt-16 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${darkMode ? "bg-blue-900/10" : "bg-blue-100/30"} blur-3xl`}
        ></div>
        <div
          className={`absolute top-1/2 -left-48 w-96 h-96 rounded-full ${darkMode ? "bg-indigo-900/10" : "bg-indigo-100/30"} blur-3xl`}
        ></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Después del título y descripción, antes del grid de talleres */}
        <div className="text-center mb-12">
          <div
            className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${
              darkMode
                ? "bg-blue-900/30 text-blue-400"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            Sus Talleres
          </div>
          <h2
            className={`text-3xl font-bold mb-4 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Gestione sus{" "}
            <span className="text-blue-600">Talleres Mecánicos</span>
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Seleccione el taller al que desea acceder para gestionar órdenes,
            clientes y vehículos
          </p>

          {/* Nuevo botón de Agregar Taller */}
          {workshops.length > 0 && (
            <button
              onClick={() => navigate("/workshop/create")}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700
                         text-white rounded-lg font-medium transition-colors gap-2"
            >
              <Plus className="w-5 h-5" />
              Agregar Taller
            </button>
          )}
        </div>

        {/* Agregar botón flotante en la esquina inferior derecha cuando hay talleres */}
        {workshops.length > 0 && (
          <button
            className="fixed bottom-8 right-8 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300
                       hover:scale-110 z-50 group"
            onClick={() => navigate("/workshop/create")}
          >
            <Plus className="w-6 h-6" />
            <span
              className="absolute right-full mr-2 bg-gray-900 text-white px-2 py-1
                            rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100
                            transition-opacity"
            >
              Agregar Taller
            </span>
          </button>
        )}

        {/* MODAL DE EDICIÓN */}
        {editModalOpen && tallerEditData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className={`bg-white dark:bg-gray-800 rounded-lg p-8 w-full max-w-lg shadow-lg relative`}>
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-white"
                onClick={() => setEditModalOpen(false)}
              >
                ×
              </button>
              <h2 className="text-xl font-bold mb-4 text-center">Editar Taller</h2>
              <form onSubmit={e => { e.preventDefault(); handleEditSave(); }}>
                <div className="mb-4">
                  <label className="block mb-1">Nombre</label>
                  <input name="nombre" value={tallerEditData.nombre || ''} onChange={handleEditChange} className="w-full p-2 rounded border dark:bg-gray-700" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Teléfono</label>
                  <div className="flex items-center">
                    <span className="inline-block px-2 py-2 bg-gray-100 dark:bg-gray-700 rounded-l border border-r-0 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 select-none">+56</span>
                    <input
                      name="telefono"
                      value={tallerEditData.telefono ? tallerEditData.telefono.replace(/^\+?56 ?/, "") : ''}
                      onChange={e => {
                        // Solo permitir números y espacios, y formatear como 9 XXXX XXXX
                        let val = e.target.value.replace(/\D/g, "");
                        if (val.startsWith("9")) {
                          val = val[0] + (val.slice(1, 5) ? " " + val.slice(1, 5) : "") + (val.slice(5, 9) ? " " + val.slice(5, 9) : "");
                        }
                        setTallerEditData(prev => ({ ...prev, telefono: val }));
                      }}
                      className="w-full p-2 rounded-r border border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                      maxLength={11}
                      placeholder="9 XXXX XXXX"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Correo</label>
                  <input name="correo" value={tallerEditData.correo || ''} onChange={handleEditChange} className="w-full p-2 rounded border dark:bg-gray-700" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1">Dirección</label>
                  <input name="direccion" value={tallerEditData.direccion || ''} onChange={handleEditChange} className="w-full p-2 rounded border dark:bg-gray-700" />
                </div>
                <div className="mb-4 flex gap-4">
                  <div className="flex-1">
                    <label className="block mb-1">Inicio jornada</label>
                    <input
                      type="time"
                      step="600"
                      name="inicio_jornada"
                      value={tallerEditData.inicio_jornada || ''}
                      onChange={handleEditChange}
                      className="w-full p-2 rounded border dark:bg-gray-700"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block mb-1">Término jornada</label>
                    <input
                      type="time"
                      step="600"
                      name="termino_jornada"
                      value={tallerEditData.termino_jornada || ''}
                      onChange={handleEditChange}
                      className="w-full p-2 rounded border dark:bg-gray-700"
                    />
                  </div>
                </div>
                {formError && (
                  <div className="mb-4 text-red-500 text-sm">
                    {formError}
                  </div>
                )}
                <button type="submit" disabled={saving} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium mt-4">
                  {saving ? "Guardando..." : "Guardar Cambios"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Grid de talleres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workshops.map((taller) => (
            <div
              key={taller.taller_id}
              onClick={() => handleTallerSelect(taller)}
              className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedTaller === taller.taller_id
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
            >
              <div
                className={`rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                  darkMode
                    ? "bg-gray-800 shadow-blue-900/20"
                    : "bg-white shadow-gray-200/80"
                }`}
              >
                {/* Header de la tarjeta */}
                <div
                  className={`p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-100"}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 rounded-xl ${darkMode ? "bg-blue-900/40" : "bg-blue-100"}`}
                      >
                        <Home
                          className={`h-6 w-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                        />
                      </div>
                      <div>
                        <h3
                          className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                        >
                          {taller.nombre}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-2 h-2 rounded-full ${getDisponibilidad(taller) ? "bg-green-500" : "bg-red-500"}`}
                          ></div>
                          <span
                            className={`text-sm font-medium ${getDisponibilidad(taller) ? "text-green-500" : "text-red-500"}`}
                          >
                            {getDisponibilidad(taller) ? "Abierto" : "Cerrado"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === taller.taller_id
                              ? null
                              : taller.taller_id,
                          );
                        }}
                        className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
                      >
                        <MoreVertical
                          className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                        />
                      </button>

                      {openMenuId === taller.taller_id && (
                        <div
                          className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${
                            darkMode
                              ? "bg-gray-800 border border-gray-700"
                              : "bg-white border border-gray-200"
                          }`}
                        >
                          <div className="py-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(taller);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm ${
                                darkMode
                                  ? "text-gray-300 hover:bg-gray-700"
                                  : "text-gray-700 hover:bg-gray-100"
                              } flex items-center gap-2`}
                            >
                              <Edit className="w-4 h-4" />
                              Editar taller
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                eliminarTaller(taller.taller_id);
                              }}
                              className={`w-full text-left px-4 py-2 text-sm ${
                                darkMode
                                  ? "text-red-400 hover:bg-gray-700"
                                  : "text-red-600 hover:bg-gray-100"
                              } flex items-center gap-2`}
                            >
                              <Trash2 className="w-4 h-4" />
                              Eliminar taller
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin
                      className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                    <span
                      className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      {taller.direccion}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock
                      className={`w-4 h-4 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                    />
                    <span
                      className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                    >
                      Próxima cita:{" "}
                      {nextCitas[taller.taller_id]?.hora
                        ? StringFormatter.formatCitaFecha(
                            nextCitas[taller.taller_id].hora,
                          )
                        : "Sin citas"}
                    </span>
                  </div>
                </div>

                {/* Estadísticas rápidas */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      className={`p-3 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}
                    >
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                        >
                          {proxCitas[taller.taller_id]}
                        </div>
                        <div
                          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Proximas Citas (1 Semana)
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${darkMode ? "bg-gray-700/50" : "bg-gray-50"}`}
                    >
                      <div className="text-center">
                        <div
                          className={`text-2xl font-bold ${darkMode ? "text-green-400" : "text-green-600"}`}
                        >
                          {ordenesTrabajo[taller.taller_id]}
                        </div>
                        <div
                          className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Órdenes activas
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón de acción */}
                <div className="px-6 pb-6">
                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all
                      ${"bg-blue-600 hover:bg-blue-700 text-white"}`}
                    onClick={() => {
                      handleTallerSelect(taller);
                    }}
                  >
                    Acceder al Dashboard
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay talleres */}
        {workshops.length === 0 && (
          <div className="text-center py-16">
            <div
              className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-6 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <Wrench
                className={`w-12 h-12 ${darkMode ? "text-gray-600" : "text-gray-400"}`}
              />
            </div>
            <h3
              className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              No hay talleres registrados
            </h3>
            <p
              className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-6`}
            >
              Agregue su primer taller para comenzar a gestionar su negocio
            </p>
            {workshops.length === 0 ? (
              <button
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                onClick={() => navigate("/workshop/create")}
              >
                Crear Primer Taller
              </button>
            ) : (
              <button
                className="fixed bottom-8 right-8 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
                onClick={() => navigate("/workshop/create")}
              >
                <Plus className="w-6 h-6" />{" "}
                {/* Necesitarás importar Plus de lucide-react */}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer simplificado */}
      <footer
        className={`mt-16 py-8 ${darkMode ? "bg-gray-800" : "bg-white"} border-t ${darkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div
            className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
          >
            © 2025 MechaniTech. Sistema de gestión para talleres mecánicos.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Workshops;
