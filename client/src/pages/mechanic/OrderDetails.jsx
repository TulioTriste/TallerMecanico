import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Phone,
  Calendar,
  User,
  Car,
  Wrench,
  Clock,
  FileText,
} from "lucide-react";
import { useDarkMode } from "../../context/darkModeContext";

const MechanicOrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [currentStatus, setCurrentStatus] = useState("Pendiente");

  // Datos de ejemplo (esto debería venir de tu API)
  const orderData = {
    orderNumber: "ORD-8",
    client: {
      name: "Mauricio Urrutia Chandia",
      phone: "+56911111111", // Este número debe venir de tu base de datos
    },
    vehicle: {
      model: "Citroen C4",
      year: "2008",
    },
    service: "Descripcion de Orden de Trabajo",
    technician: "Por asignar",
    dates: {
      created: "14/06/2025",
      estimated: "14/08/2025",
    },
    status: "Pendiente",
  };

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    // Aquí irá la lógica para actualizar el estado en tu backend
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = orderData.client.phone
      .replace(/\+/g, "")
      .replace(/\s/g, "");
    const message = `Hola ${orderData.client.name}, le contactamos por su vehículo ${orderData.vehicle.model} ${orderData.vehicle.year}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className={`min-h-screen pt-20 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Encabezado */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Orden de Trabajo {orderData.orderNumber}
          </h1>
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              currentStatus === "Pendiente"
                ? "bg-yellow-100 text-yellow-800"
                : currentStatus === "Ingresada"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
            }`}
          >
            {currentStatus}
          </div>
        </div>

        {/* Información Principal */}
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8`}>
          {/* Información del Cliente */}
          <div
            className={`p-6 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Información del Cliente
            </h2>
            <div className="space-y-3">
              <p className="flex items-center">
                <span className="font-medium mr-2">Nombre:</span>
                {orderData.client.name}
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                {orderData.client.phone}
              </p>
            </div>
          </div>

          {/* Información del Vehículo */}
          <div
            className={`p-6 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Car className="w-5 h-5 mr-2" />
              Información del Vehículo
            </h2>
            <div className="space-y-3">
              <p>
                <span className="font-medium">Modelo:</span>{" "}
                {orderData.vehicle.model}
              </p>
              <p>
                <span className="font-medium">Año:</span>{" "}
                {orderData.vehicle.year}
              </p>
            </div>
          </div>
        </div>

        {/* Detalles del Servicio */}
        <div
          className={`p-6 rounded-lg shadow-lg mb-8 ${
            darkMode ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Wrench className="w-5 h-5 mr-2" />
            Detalles del Servicio
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Descripción:</h3>
              <p
                className={`p-3 rounded-md ${darkMode ? "bg-gray-700" : "bg-gray-50"}`}
              >
                {orderData.service}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Técnico Asignado:</h3>
              <p>{orderData.technician}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Fecha de Ingreso:
                </h3>
                <p>{orderData.dates.created}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Fecha Estimada:
                </h3>
                <p>{orderData.dates.estimated}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Botón de WhatsApp */}
          <button
            onClick={handleWhatsAppContact}
            className="flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contactar al Cliente
          </button>

          {/* Selector de Estado */}
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className={`px-6 py-3 rounded-lg font-medium border ${
              darkMode
                ? "bg-gray-800 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="Pendiente">Pendiente</option>
            <option value="Ingresada">Ingresada</option>
            <option value="Terminada">Terminada</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default MechanicOrderDetails;
