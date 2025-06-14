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
} from "lucide-react";
import { useDarkMode } from "../../context/darkModeContext.jsx";

export default function VehicleDetails() {
  const { darkMode } = useDarkMode();

  const mockData = {
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
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 pt-16 ${
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
                    {mockData.vehiculo.marca} {mockData.vehiculo.modelo}
                  </h1>
                  <div
                    className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    Patente: {mockData.vehiculo.patente}
                  </div>
                </div>
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  mockData.orden.estado === "Mantención Finalizada"
                    ? darkMode
                      ? "bg-green-900/30 text-green-400"
                      : "bg-green-100 text-green-700"
                    : darkMode
                      ? "bg-yellow-900/30 text-yellow-400"
                      : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {mockData.orden.estado}
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
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Nombre
                      </dt>
                      <dd className="font-medium mt-1">
                        {mockData.cliente.nombre}
                      </dd>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>{mockData.cliente.telefono}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2" />
                      <span>{mockData.cliente.email}</span>
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
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Nombre
                      </dt>
                      <dd className="font-medium mt-1">
                        {mockData.sucursal.nombre}
                      </dd>
                      <dd className="text-sm text-gray-500">
                        {mockData.sucursal.rut}
                      </dd>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>{mockData.sucursal.direccion}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2" />
                      <span>{mockData.sucursal.telefono}</span>
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
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Fecha de Creación
                      </dt>
                      <dd className="font-medium mt-1">
                        {mockData.orden.fechaCreacion}
                      </dd>
                    </div>
                    <div>
                      <dt
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Fecha Término Estimada
                      </dt>
                      <dd className="font-medium mt-1">
                        {mockData.orden.fechaTermino}
                      </dd>
                    </div>
                    <div className="md:col-span-2">
                      <dt
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Trabajo a Realizar
                      </dt>
                      <dd className="font-medium mt-1">
                        {mockData.orden.trabajo}
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
            <h2 className="text-lg font-semibold mb-6 flex items-center">
              <FileImage className="w-5 h-5 mr-2" />
              Tareas y Registro Fotográfico
            </h2>
            <div className="space-y-8">
              {mockData.tareas.map((tarea, index) => (
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
      </div>
    </div>
  );
}
