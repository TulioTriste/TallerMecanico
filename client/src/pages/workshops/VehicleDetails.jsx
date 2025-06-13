import {Building2, Car, CheckCircle2, FileImage, Mail, MapPin, Phone, User, Wrench,} from "lucide-react";
import {useDarkMode} from "../../context/darkModeContext.jsx";

export default function VehicleDetails() {
  const {darkMode} = useDarkMode();

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
      prioridad: "Normal",
      area: "Salida",
      fechaCreacion: "16/04/2025 11:50 hs",
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
    imagenes: [
      "https://picsum.photos/400/300",
      "https://picsum.photos/400/300",
      "https://picsum.photos/400/300",
      "https://picsum.photos/400/300",
    ],
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 pt-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Banner superior con estado */}
      <div
        className={`w-full ${
          mockData.orden.estado === "Mantención Finalizada"
            ? darkMode
              ? "bg-green-900/30"
              : "bg-green-50"
            : darkMode
              ? "bg-yellow-900/30"
              : "bg-yellow-50"
        } mb-8`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CheckCircle2
                className={`w-6 h-6 ${
                  mockData.orden.estado === "Mantención Finalizada"
                    ? darkMode
                      ? "text-green-400"
                      : "text-green-600"
                    : darkMode
                      ? "text-yellow-400"
                      : "text-yellow-600"
                }`}
              />
              <div>
                <div
                  className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Estado actual
                </div>
                <div className="font-medium text-lg">
                  Esta orden se encuentra lista para ser entregada
                </div>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                Orden de trabajo
              </div>
              <div className="font-medium text-lg">
                #{mockData.orden.numero}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        {/* Información Principal */}
        <div
          className={`rounded-2xl shadow-xl overflow-hidden mb-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Card del Vehículo */}
          <div className={`p-6 ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}>
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
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Nombre
                      </dt>
                      <dd className="font-medium mt-1">
                        {mockData.cliente.nombre}
                      </dd>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2"/>
                      <span>{mockData.cliente.telefono}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 mr-2"/>
                      <span>{mockData.cliente.email}</span>
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
                      <MapPin className="w-5 h-5 mr-2"/>
                      <span>{mockData.sucursal.direccion}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2"/>
                      <span>{mockData.sucursal.telefono}</span>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Detalles del Servicio */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Wrench className="w-5 h-5 mr-2"/>
                  Detalles del Servicio
                </h3>
                <div
                  className={`rounded-xl p-4 shadow-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <dt
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Prioridad
                      </dt>
                      <dd className="font-medium mt-1">
                        {mockData.orden.prioridad}
                      </dd>
                    </div>
                    <div>
                      <dt
                        className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                      >
                        Área
                      </dt>
                      <dd className="font-medium mt-1">
                        {mockData.orden.area}
                      </dd>
                    </div>
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
                    <div className="md:col-span-3">
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

        {/* Galería de Imágenes */}
        <div
          className={`rounded-2xl shadow-xl overflow-hidden ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FileImage className="w-5 h-5 mr-2"/>
              Registro Fotográfico
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mockData.imagenes.map((url, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden shadow-md"
                >
                  <img
                    src={url}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
