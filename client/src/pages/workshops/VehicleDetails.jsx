import {useEffect, useState} from "react";
import {
  Building2,
  Car,
  Check,
  Edit,
  FileImage,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  RefreshCcw,
  Upload,
  User,
  Wrench,
  X,
} from "lucide-react";
import {useDarkMode} from "../../context/darkModeContext.jsx";
import {useParams} from "react-router-dom";
import {useControlPanel} from "../../context/controlPanelContext.jsx";
import {API_URL, FRONTEND_URL} from "../../config.js";
import {sendUpdateWhatsapp} from "../../utilities/whatsapp.js";
import StringFormatter from "../../utilities/stringFormatter.js";

export default function VehicleDetails() {
  const { tallerId, orderId } = useParams();
  const { estados, getOt, getTasks, uploadImages, addTask, updateOt } = useControlPanel();

  const [ot, setOt] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const { darkMode } = useDarkMode();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const fetchTasks = async () => {
    try {
      const taskResponse = await getTasks(tallerId, orderId);
      setTasks(taskResponse);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Error al cargar las tareas. Por favor, inténtalo de nuevo.");
    }
  }

  useEffect(() => {
    const fetchOtData = async () => {
      try {
        const response = await getOt(tallerId, orderId);
        setOt(response);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOtData();
    fetchTasks();
  }, [getOt, tallerId, orderId]);

  const [newTask, setNewTask] = useState({
    titulo: "",
    descripcion: "",
    ruta_imagenes: [],
  });

  const handleSaveChanges = async (updOt) => {
    setShowAlert(true);

    let response;
    if (updOt) {
      response = await updateOt(tallerId, orderId, updOt);
    } else {
      response = await updateOt(tallerId, orderId, ot);
    }
    if (response) {
      alert("Cambios guardados correctamente.");
      setShowAlert(false);
      setShowEditModal(false);
    }
  };

  const handleAddImageToTask = async () => {
    try {
      let imagePaths = [];

      if (selectedImages.length > 0) {
        const formData = new FormData();

        selectedImages.forEach(image => {
          formData.append("files", image);
        })

        const response = await uploadImages(formData);
        if (!response.success) {
          throw new Error("Error al subir las imágenes");
        }

        imagePaths = response.urls;
      }

      newTask.ruta_imagenes = imagePaths.map(url => API_URL + url);

      const resNewTask = await addTask(tallerId, orderId, newTask);
      if (!resNewTask) {
        throw new Error("Error al agregar la tarea");
      }

      await fetchTasks();

      setNewTask({
        titulo: "",
        descripcion: "",
        ruta_imagenes: [],
      });
      setPreviewImages([]);
      setSelectedImages([]);
      setShowTaskModal(false);
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
      alert("Error al agregar la tarea. Por favor, inténtalo de nuevo.");
    }

  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);

    // Validar tipos de archivo y tamaño
    const validFiles = files.filter(file => {
      const isValid = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB máximo
      return isValid && isValidSize;
    });

    // Crear previsualizaciones
    const imagePreviews = validFiles.map(file => URL.createObjectURL(file));
    setPreviewImages(prev => [...prev, ...imagePreviews]);
    setSelectedImages(prev => [...prev, ...validFiles]);

    setNewTask(prev => {
      if (!Array.isArray(prev.ruta_imagenes)) {
        throw new Error('ruta_imagenes debe ser un array');
      }

      const newFileNames = validFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified
      }));

      const uniqueFiles = [...new Set([
        ...prev.ruta_imagenes,
        ...newFileNames
      ])];

      return {
        ...prev,
        ruta_imagenes: uniqueFiles
      }
    });
  };

  // Función para eliminar imágenes
  const handleRemoveImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewImages(prev => prev.filter((_, i) => i !== index));

    setTasks(prevTasks => {
      return prevTasks.map(task => {
        return {
          ...task,
          ruta_imagenes: task.ruta_imagenes.filter((_, i) => i !== index)
        };
      });
    })
  };

  const handleStatusChange = async (e) => {
    const updatedOt = {
      ...ot,
      estado_id: e.estado_id,
      estado_nombre: e.nombre
    }

    setOt(updatedOt);

    setShowStatusModal(false);
    handleSaveChanges(updatedOt);
  }

  const handleWhatsAppUpdate = (e) => {
    e.preventDefault();
    if (!ot || !ot.cliente_telefono) {
      alert("No se puede enviar el mensaje. Verifica que la orden de trabajo y el número de teléfono del cliente estén disponibles.");
      return;
    }

    const message = `Hola ${ot.cliente_nombre},\n
                \n
                Tu solicitud de servicio para el vehículo ${ot.vehiculo_marca} ${ot.vehiculo_modelo} 
                con patente ${ot.vehiculo_patente} ha sido actualizada a "${ot.estado_nombre}".\n
                \n
                Descripción del servicio: ${ot.descripcion}\n
                \n
                Link: ${FRONTEND_URL}/order/${ot.uniqueId}\n
                \n
                Gracias por confiar en nosotros.`;

    sendUpdateWhatsapp(ot.cliente_telefono, message)
      .then(() => {
        alert("Mensaje enviado correctamente.");
      })
      .catch((error) => {
        console.error("Error al enviar el mensaje:", error);
        alert("Error al enviar el mensaje. Por favor, inténtalo de nuevo.");
      });
  }

  if (!ot) {
    return (
      <div className={`min-h-screen transition-colors duration-300 pt-24 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <h1 className="text-xl font-semibold mb-4">Cargando detalles de la orden...</h1>
        </div>
      </div>
    );
  }

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
                    {ot.vehiculo_marca} {ot.vehiculo_modelo}
                  </h1>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Patente: {ot.vehiculo_patente}
                  </div>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  ot.estado_nombre === "Terminada"
                    ? darkMode
                      ? "bg-green-900/30 text-green-400"
                      : "bg-green-100 text-green-700"
                    : darkMode
                      ? "bg-yellow-900/30 text-yellow-400"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {ot.estado_nombre}
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Información del Cliente */}
              <div className="h-full">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2"/>
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
                        {ot.cliente_nombre}
                      </dd>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>{ot.cliente_telefono}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      <span>{ot.cliente_correo}</span>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Información de la Sucursal */}
              <div className="h-full">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2"/>
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
                        {ot.taller_nombre}
                      </dd>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{ot.taller_direccion}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>{ot.taller_telefono}</span>
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
                      onClick={handleWhatsAppUpdate}
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
                      onClick={() => {
                        setShowStatusModal(true);
                      }}
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
                        {StringFormatter.formatFechaDDMMYYYY(ot.created_at)}
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
                        {StringFormatter.formatFechaDDMMYYYY(ot.fecha_salida)}
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
                        {ot.descripcion}
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
              {tasks.map((task, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-lg font-medium">{task.titulo}</h3>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {task.descripcion}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {task.ruta_imagenes.map((url, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="aspect-square rounded-xl overflow-hidden shadow-md"
                      >
                        <img
                          src={url}
                          alt={`${task.titulo} - Imagen ${imgIndex + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          decoding="async"
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
                value={newTask.titulo}
                onChange={(e) =>
                  setNewTask({ ...newTask, titulo: e.target.value })
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

              <div className="flex items-center justify-left">
                <label className={`flex items-center px-4 py-2 rounded-lg mb-4 ${
                  darkMode
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white`}>
                  <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Upload className="w-5 h-5 mr-2 inline"/>
                  Subir Imágenes
                </label>
              </div>
              {previewImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {previewImages.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4"/>
                      </button>
                    </div>
                  ))}
                </div>
              )}


              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddImageToTask}
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
                {estados.map((estado) => (
                  <button
                    key={estado.estado_id}
                    onClick={() => {
                      handleStatusChange(estado);
                    }}
                    className={`w-full p-3 rounded-lg flex items-center justify-between ${
                      darkMode
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {estado.nombre}
                    {ot.estado_id === estado.estado_id && (
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
                        value={ot.vehiculo_marca}
                        onChange={(e) =>
                          setOt({
                            ...ot,
                            vehiculo_marca: e.target.value
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Modelo"
                        value={ot.vehiculo_modelo}
                        onChange={(e) =>
                          setOt({
                            ...ot,
                            vehiculo_modelo: e.target.value
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Patente"
                        value={ot.vehiculo_patente}
                        onChange={(e) =>
                          setOt({
                            ...ot,
                            vehiculo_patente: e.target.value
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
                        value={ot.cliente_nombre}
                        onChange={(e) =>
                          setOt({
                            ...ot,
                            cliente_nombre: e.target.value
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Teléfono"
                        value={ot.cliente_telefono}
                        onChange={(e) =>
                          setOt({
                            ...ot,
                            cliente_telefono: e.target.value
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={ot.cliente_correo}
                        onChange={(e) =>
                          setOt({
                            ...ot,
                            cliente_correo: e.target.value
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
                      value={ot.descripcion}
                      onChange={(e) =>
                        setOt({
                          ...ot,
                          descripcion: e.target.value
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
                        value={ot.created_at}
                        onChange={(e) =>
                          setOt({
                            ...ot,
                            created_at: e.target.value
                          })
                        }
                        className={`w-full p-2 rounded-lg ${
                          darkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Fecha término estimada"
                        value={ot.fecha_salida}
                        onChange={(e) =>
                          setOt({
                            ...ot,
                            fecha_salida: e.target.value
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
                    handleWhatsAppUpdate();
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
