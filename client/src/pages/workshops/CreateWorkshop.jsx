import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useDarkMode } from "../../context/darkModeContext.jsx";
import { useAuth } from "../../context/authContext.jsx";
import axios from "../../api/axios.js";
import {useWorkshop} from "../../context/workshopContext.jsx";

const CreateWorkshop = () => {
  const {darkMode} = useDarkMode();
  const {user} = useAuth();
  const navigate = useNavigate();
  const {createTaller, cargarTalleres} = useWorkshop();

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    direccion: "",
    inicio_jornada: "",
    termino_jornada: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // Convertir horarios a formato numérico (de "HH:mm" a HHMM)
      const inicio_jornada = formData.inicio_jornada.replace(":", "");
      const termino_jornada = formData.termino_jornada.replace(":", "");

      // Crear el objeto con los datos del taller
      const tallerData = {
        usuario_rut: user.rut,
        ...formData,
        inicio_jornada: parseInt(inicio_jornada),
        termino_jornada: parseInt(termino_jornada),
      };

      // Realizar la petición POST al backend
      const response = await createTaller(tallerData);

      if (response.status === 403) {
        setError(response.message);
      } else {
        setSuccess("Taller creado exitosamente");

        await cargarTalleres();

        setTimeout(() => {
          navigate("/workshops");
        }, 2000);
      }
      } catch (err) {
      console.log("Error al crear el taller:", err);
      setError(err.response?.data?.message || "Error al crear el taller");
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 pt-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${
            darkMode ? "bg-blue-900/10" : "bg-blue-100/30"
          } blur-3xl`}
        ></div>
        <div
          className={`absolute top-1/2 -left-48 w-96 h-96 rounded-full ${
            darkMode ? "bg-indigo-900/10" : "bg-indigo-100/30"
          } blur-3xl`}
        ></div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Título y descripción */}
        <div className="text-center mb-12">
          <div
            className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${
              darkMode
                ? "bg-blue-900/30 text-blue-400"
                : "bg-blue-100 text-blue-800"
            }`}
          >
            Nuevo Taller
          </div>
          <h2
            className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
          >
            Crear <span className="text-blue-600">Nuevo Taller</span>
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Complete el formulario para registrar un nuevo taller mecánico
          </p>
        </div>

        {/* Formulario */}
        <div
          className={`rounded-2xl overflow-hidden shadow-lg ${
            darkMode
              ? "bg-gray-800 shadow-blue-900/20"
              : "bg-white shadow-gray-200/80"
          }`}
        >
          <form onSubmit={handleSubmit} className="p-8">
            {/* Campo Nombre */}
            <div className="mb-6">
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Nombre del Taller
              </label>
              <div className="relative">
                <Home
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>
            </div>

            {/* Campo Teléfono */}
            <div className="mb-6">
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Teléfono
              </label>
              <div className="relative">
                <Phone
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>
            </div>

            {/* Campo Correo */}
            <div className="mb-6">
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>
            </div>

            {/* Campo Dirección */}
            <div className="mb-6">
              <label
                className={`block text-sm font-medium mb-2 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Dirección
              </label>
              <div className="relative">
                <MapPin
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
              </div>
            </div>

            {/* Horarios */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Inicio Jornada */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Inicio Jornada
                </label>
                <div className="relative">
                  <Clock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="time"
                    name="inicio_jornada"
                    value={formData.inicio_jornada}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
              </div>

              {/* Término Jornada */}
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Término Jornada
                </label>
                <div className="relative">
                  <Clock
                    className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    type="time"
                    name="termino_jornada"
                    value={formData.termino_jornada}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Mensajes de error y éxito */}
            {error && (
              <div className="mb-4 p-4 rounded-lg bg-red-100 border border-red-400 text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 rounded-lg bg-green-100 border border-green-400 text-green-700">
                {success}
              </div>
            )}

            {/* Botones */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Crear Taller
              </button>
              <button
                type="button"
                onClick={() => navigate("/workshops")}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                  darkMode
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                }`}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkshop;
