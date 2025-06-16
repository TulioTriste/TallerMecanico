import { useState } from "react";
import {
  Building2,
  Phone,
  Mail,
  Car,
  Clock,
  CheckCircle2,
  MapPin,
  User,
  FileImage,
  Calendar,
  Wrench,
  MessageCircle,
  RefreshCcw,
  Plus,
  Edit,
  Upload,
  Check,
  X,
} from "lucide-react";
import { useDarkMode } from "../../context/darkModeContext.jsx";

export default function VehicleDetails() {
  const { darkMode } = useDarkMode();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [newTask, setNewTask] = useState({
    nombre: "",
    descripcion: "",
    imagenes: [],
  });

  const [editData, setEditData] = useState({
    sucursal: {
      nombre: "DYNORACING MACUL",
      rut: "77.241.978-3",
      direccion: "AV. MACUL 4394",
      telefono: "56936671117",
    },
    orden: {
      numero: "1999",
      estado: "Mantención Finalizada",
      fechaCreacion: "16/04/2025 11:50 hs",
      fechaTermino: "20/04/2025 15:30 hs",
      trabajo: "Registro para envío de moto",
    },
    cliente: {
      nombre: "Bastian Ampuero",
      telefono: "+56976688986",
      email: "ampuerobastian05@prueba.com",
    },
    vehiculo: {
      marca: "Suzuki",
      modelo: "GSXR1000RR",
      patente: "JVP041",
    },
    tareas: [
      {
        nombre: "Cambio de aceite",
        descripcion:
          "Se realizó el cambio de aceite utilizando aceite sintético 10W-40 y se reemplazó el filtro de aceite.",
        imagenes: [
          "https://picsum.photos/400/300",
          "https://picsum.photos/400/300",
        ],
      },
      {
        nombre: "Revisión de frenos",
        descripcion:
          "Se inspeccionaron las pastillas de freno y se ajustó el sistema de frenado. Se recomendó cambio de pastillas en próxima mantención.",
        imagenes: [
          "https://picsum.photos/400/300",
          "https://picsum.photos/400/300",
        ],
      },
    ],
  });

  const handleSaveChanges = () => {
    setShowAlert(true);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hola! Como estás?\nEstamos avanzando en tu vehiculo!",
    );
    window.open(`https://wa.me/56972196207?text=${message}`, "_blank");
  };

  const handleAddTask = () => {
    setEditData((prev) => ({
      ...prev,
      tareas: [...prev.tareas, newTask],
    }));
    setNewTask({
      nombre: "",
      descripcion: "",
      imagenes: [],
    });
    setShowTaskModal(false);
    handleSaveChanges();
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 pt-24 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Header Actions */}
        <div className="flex justify-end gap-4 mb-6">
          <button
            onClick={() => setShowEditModal(true)}
            className={`flex items-center px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-purple-500 hover:bg-purple-600"
            } text-white transition-colors`}
          >
            <Edit className="w-5 h-5 mr-2" />
            Editar Solicitud
          </button>
        </div>

        {/* Información Principal */}
        <div
          className={`rounded-2xl shadow-xl overflow-hidden mb-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Card del Vehículo */}
          <div className={`p-6 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-xl ${
                    darkMode ? "bg-gray-600" : "bg-white"
                  }`}
                >
                  <Car
                    className={`w-6 h-6 ${
                      darkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  />
                </div>
                <div>
                  <h1 className="text-lg font-semibold">
                    {editData.vehiculo.marca} {editData.vehiculo.modelo}
                  </h1>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Patente: {editData.vehiculo.patente}
                  </div>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  editData.orden.estado === "Mantención Finalizada"
                    ? darkMode
                      ? "bg-green-900/30 text-green-400"
                      : "bg-green-100 text-green-700"
                    : darkMode
                      ? "bg-yellow-900/30 text-yellow-400"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {editData.orden.estado}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Información del Cliente */}
              <div className="h-full">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Información del Cliente
                </h3>
                <div
                  className={`rounded-xl p-6 shadow-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <dl className="space-y-4">
                    <div>
                      <dt
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Nombre
                      </dt>
                      <dd className="font-medium mt-1">
                        {editData.cliente.nombre}
                      </dd>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>{editData.cliente.telefono}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      <span>{editData.cliente.email}</span>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Información de la Sucursal */}
              <div className="h-full">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Sucursal Asignada
                </h3>
                <div
                  className={`rounded-xl p-4 shadow-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <dl className="space-y-4">
                    <div>
                      <dt
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Nombre
                      </dt>
                      <dd className="font-medium mt-1">
                        {editData.sucursal.nombre}
                      </dd>
                      <dd className="text-sm text-gray-500">
                        {editData.sucursal.rut}
                      </dd>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{editData.sucursal.direccion}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>{editData.sucursal.telefono}</span>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Detalles del Servicio */}
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Wrench className="w-5 h-5 mr-2" />
                    Detalles del Servicio
                  </h3>
                  <div className="flex gap-4">
                    <button
                      onClick={handleWhatsApp}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        darkMode
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white transition-colors`}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Enviar WhatsApp
                    </button>
                    <button
                      onClick={() => setShowStatusModal(true)}
                      className={`flex items-center px-4 py-2 rounded-lg ${
                        darkMode
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-blue-500 hover:bg-blue-600"
                      } text-white transition-colors`}
                    >
                      <RefreshCcw className="w-5 h-5 mr-2" />
                      Cambiar Estado
                    </button>
                  </div>
                </div>
                <div
                  className={`rounded-xl p-4 shadow-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <dt
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Fecha de Creación
                      </dt>
                      <dd className="font-medium mt-1">
                        {editData.orden.fechaCreacion}
                      </dd>
                    </div>
                    <div>
                      <dt
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Fecha Término Estimada
                      </dt>
                      <dd className="font-medium mt-1">
                        {editData.orden.fechaTermino}
                      </dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        Trabajo a Realizar
                      </dt>
                      <dd className="font-medium mt-1">
                        {editData.orden.trabajo}
                      </dd>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tareas y Registro Fotográfico */}
        <div
          className={`rounded-2xl shadow-xl overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center">
                <FileImage className="w-5 h-5 mr-2" />
                Tareas y Registro Fotográfico
              </h2>
              <button
                onClick={() => setShowTaskModal(true)}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white transition-colors`}
              >
                <Plus className="w-5 h-5 mr-2" />
                Añadir Tarea
              </button>
            </div>
            <div className="space-y-8">
              {editData.tareas.map((tarea, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-lg font-medium">{tarea.nombre}</h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {tarea.descripcion}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {tarea.imagenes.map((url, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="aspect-square rounded-xl overflow-hidden shadow-md"
                      >
                        <img
                          src={url}
                          alt={`${tarea.nombre} - Imagen ${imgIndex + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Task Modal */}
        {showTaskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className={`rounded-xl p-6 max-w-md w-full ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Añadir Nueva Tarea</h3>
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <input
                type="text"
                placeholder="Título de la tarea"
                className={`w-full p-2 rounded-lg mb-4 ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
                value={newTask.nombre}
                onChange={(e) =>
                  setNewTask({ ...newTask, nombre: e.target.value })
                }
              />
              <textarea
                placeholder="Descripción de la tarea"
                className={`w-full p-2 rounded-lg mb-4 min-h-[100px] ${
                  darkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
                value={newTask.descripcion}
                onChange={(e) =>
                  setNewTask({ ...newTask, descripcion: e.target.value })
                }
              />
              <button
                className={`flex items-center px-4 py-2 rounded-lg mb-4 ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}
              >
                <Upload className="w-5 h-5 mr-2" />
                Adjuntar Fotos
              </button>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddTask}
                  className={`px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Status Modal */}
        {showStatusModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className={`rounded-xl p-6 max-w-md w-full ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Cambiar Estado</h3>
                <button
                  onClick={() => setShowStatusModal(false)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                {["Pendiente", "Ingresada", "Terminada"].map((estado) => (
                  <button
                    key={estado}
                    onClick={() => {
                      setEditData((prev) => ({
                        ...prev,
                        orden: { ...prev.orden, estado },
                      }));
                      setShowStatusModal(false);
                      handleSaveChanges();
                    }}
                    className={`w-full p-3 rounded-lg flex items-center justify-between ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {estado}
                    {editData.orden.estado === estado && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className={`rounded-xl p-6 max-w-4xl w-full ${darkMode ? "bg-gray-800" : "bg-white"} max-h-[90vh] overflow-y-auto`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Editar Solicitud</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-200 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Formulario de edición */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Información del Vehículo */}
                  <div>
                    <h4 className="font-medium mb-4">
                      Información del Vehículo
                    </h4>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Marca"
                        value={editData.vehiculo.marca}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            vehiculo: {
                              ...editData.vehiculo,
                              marca: e.target.value,
                            },
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Modelo"
                        value={editData.vehiculo.modelo}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            vehiculo: {
                              ...editData.vehiculo,
                              modelo: e.target.value,
                            },
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Patente"
                        value={editData.vehiculo.patente}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            vehiculo: {
                              ...editData.vehiculo,
                              patente: e.target.value,
                            },
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Información del Cliente */}
                  <div>
                    <h4 className="font-medium mb-4">
                      Información del Cliente
                    </h4>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Nombre"
                        value={editData.cliente.nombre}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            cliente: {
                              ...editData.cliente,
                              nombre: e.target.value,
                            },
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Teléfono"
                        value={editData.cliente.telefono}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            cliente: {
                              ...editData.cliente,
                              telefono: e.target.value,
                            },
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={editData.cliente.email}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            cliente: {
                              ...editData.cliente,
                              email: e.target.value,
                            },
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Detalles del Servicio */}
                <div>
                  <h4 className="font-medium mb-4">Detalles del Servicio</h4>
                  <div className="space-y-4">
                    <textarea
                      placeholder="Trabajo a realizar"
                      value={editData.orden.trabajo}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          orden: { ...editData.orden, trabajo: e.target.value },
                        })
                      }
                      className={`w-full p-2 rounded-lg min-h-[100px] ${
                        darkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Fecha de creación"
                        value={editData.orden.fechaCreacion}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            orden: {
                              ...editData.orden,
                              fechaCreacion: e.target.value,
                            },
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Fecha término estimada"
                        value={editData.orden.fechaTermino}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            orden: {
                              ...editData.orden,
                              fechaTermino: e.target.value,
                            },
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    handleSaveChanges();
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white`}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Alert Modal */}
        {showAlert && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div
              className={`rounded-xl p-6 max-w-md w-full ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <h3 className="text-xl font-semibold mb-4">
                Se hicieron cambios en la solicitud
              </h3>
              <p className="mb-6">
                ¿Deseas notificar al cliente sobre los cambios?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowAlert(false)}
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    handleWhatsApp();
                    setShowAlert(false);
                  }}
                  className="flex items-center px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Hablar al cliente
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
