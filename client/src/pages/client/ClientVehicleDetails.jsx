import { useEffect, useState } from "react";
import {
  Building2,
  Phone,
  Mail,
  Car,
  MapPin,
  User,
  FileImage,
  Wrench,
} from "lucide-react";
import { useDarkMode } from "../../context/darkModeContext.jsx";
import { useParams } from "react-router-dom";
import { useControlPanel } from "../../context/controlPanelContext.jsx";
import StringFormatter from "../../utilities/stringFormatter.js";

export default function ClientVehicleDetails() {
  const { uniqueId } = useParams();

  const { getOtByUniqueId, getTasks } = useControlPanel();
  const { darkMode } = useDarkMode();

  const [data, setData] = useState(null);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchOtDetails = async () => {
      try {
        const response = await getOtByUniqueId(uniqueId);
        if (response) {
          // Aquí podrías actualizar el estado con los datos obtenidos
          setData(response);
          console.log("Detalles de la OT:", response);
        } else {
          console.error(
            "No se encontraron detalles para la OT con ID:",
            uniqueId,
          );
          return;
        }

        const taskResponse = await getTasks(response.taller_id, response.ot_id);
        if (taskResponse) {
          setTasks(taskResponse);
          console.log("Tareas de la OT:", taskResponse);
        } else {
          console.error(
            "No se encontraron tareas para la OT con ID:",
            uniqueId,
          );
        }
      } catch (error) {
        console.error("Error al obtener los detalles de la OT:", error);
      }
    };

    fetchOtDetails();
  }, [uniqueId, getOtByUniqueId, getTasks]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Cargando detalles...</h1>
          <p className="text-gray-500">
            Por favor, espera mientras se cargan los datos.
          </p>
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
                    {data.vehiculo_marca} {data.vehiculo_modelo}
                  </h1>
                  <div
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Patente: {data.vehiculo_patente}
                  </div>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  data.estado_nombre === "Terminada"
                    ? darkMode
                      ? "bg-green-900/30 text-green-400"
                      : "bg-green-100 text-green-700"
                    : darkMode
                      ? "bg-yellow-900/30 text-yellow-400"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {data.estado_nombre}
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
                        {data.cliente_nombre}
                      </dd>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>{data.cliente_telefono}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      <span>{data.cliente_correo}</span>
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
                      <dd className="font-medium mt-1">{data.taller_nombre}</dd>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{data.taller_direccion}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>{data.taller_telefono}</span>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Detalles del Servicio */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Wrench className="w-5 h-5 mr-2" />
                  Detalles del Servicio
                </h3>
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
                        {StringFormatter.formatFechaDDMMYYYY(data.created_at)}
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
                        {StringFormatter.formatFechaDDMMYYYY(data.fecha_salida)}
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
                      <dd className="font-medium mt-1">{data.descripcion}</dd>
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
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <FileImage className="w-5 h-5 mr-2" />
              Tareas y Registro Fotográfico
            </h2>
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
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
