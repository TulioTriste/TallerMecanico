import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  Car,
  FileText,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  Gauge,
  DollarSign,
} from "lucide-react";
import { useDarkMode } from "../../context/darkModeContext";
import {useCliente} from "../../context/clienteContext.jsx";
import {useVehiculo} from "../../context/vehiculoContext.jsx";
import {useEmpleado} from "../../context/empleadosContext.jsx";
import {useControlPanel} from "../../context/controlPanelContext.jsx";

export default function CreateWorkshop() {
  const { id } = useParams();
  const { darkMode } = useDarkMode();
  const {getClienteByRut} = useCliente();
  const {getVehiculoByPatente} = useVehiculo();
  const {isEmpleadoExists} = useEmpleado();
  const {addOt} = useControlPanel();

  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Estado para el formulario completo
  const [formData, setFormData] = useState({
    // Paso 1: Datos del cliente
    cliente_rut: "",
    cliente_nombre: "",
    cliente_correo: "",
    cliente_telefono: "",

    // Paso 2: Datos del vehículo
    vehiculo_patente: "",
    vehiculo_marca: "",
    vehiculo_modelo: "",
    vehiculo_anio: "",
    vehiculo_color: "",

    // Paso 3: Datos de la orden
    empleado_rut: "",
    fecha_salida: "",
    descripcion: "",
    km: "",
    precio: "",
    taller_id: id,
  });

  const formatRut = (rut) => {
    let valor = rut.replace(/\./g, "").replace("-", "");

    valor = valor.replace(/[^0-9kK]/g, "");

    let dv = valor.slice(-1);
    let numero = valor.slice(0, -1);

    if (numero.length > 0) {
      numero = numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      return numero + "-" + dv;
    }

    return valor;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.endsWith("_rut")) {
      setFormData((prev) => ({
        ...prev,
        [name]: formatRut(value),
      }));
    } else if (name === "vehiculo_patente") {
      // Convertir a mayúsculas la patente
      setFormData((prev) => ({
        ...prev,
        [name]: value.toUpperCase(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Función para validar RUT chileno
  const validateRut = (rut) => {
    // Expresión regular para validar el formato XX.XXX.XXX-X
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
    return rutRegex.test(rut);
  };

  // Función para validar paso
  const validateStep = async (step) => {
    setError("");

    // Solo validar si el usuario está intentando avanzar al siguiente paso
    if (step === currentStep) {
      switch (step) {
        case 1:
          if (!formData.cliente_rut.trim()) {
            setError("El RUT es obligatorio");
            return false;
          }
          // Validar formato del RUT
          if (!validateRut(formData.cliente_rut)) {
            setError("El RUT ingresado no es válido");
            return false;
          }
          if (!formData.cliente_nombre.trim()) {
            setError("El nombre es obligatorio");
            return false;
          }
          if (!formData.cliente_correo.trim()) {
            setError("El correo es obligatorio");
            return false;
          }
          if (!formData.cliente_telefono.trim()) {
            setError("El teléfono es obligatorio");
            return false;
          }
          // Validar formato de correo
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.cliente_correo)) {
            setError("El formato del correo electrónico no es válido");
            return false;
          }
          // Validar formato de teléfono (opcional)
          if (!/^\+?56?[0-9]{9}$/.test(formData.cliente_telefono.replace(/\s/g, ""))) {
            setError(
              "El formato del teléfono no es válido (debe ser número chileno)",
            );
            return false;
          }
          break;

        case 2:
          {
          if (!formData.vehiculo_patente.trim()) {
            setError("La patente es obligatoria");
            return false;
          }
          // Validar formato de patente chilena (BBBB99 o BB9999)
          const patenteRegex = /^[A-Z]{2,4}\d{2,4}$/;
          if (!patenteRegex.test(formData.vehiculo_patente)) {
            setError("El formato de la patente no es válido");
            return false;
          }
          if (!formData.vehiculo_marca.trim()) {
            setError("La marca es obligatoria");
            return false;
          }
          if (!formData.vehiculo_modelo.trim()) {
            setError("El modelo es obligatorio");
            return false;
          }
          if (!formData.vehiculo_anio) {
            setError("El año es obligatorio");
            return false;
          }
          if (!formData.vehiculo_color.trim()) {
            setError("El color es obligatorio");
            return false;
          }
          // Validar año
          const currentYear = new Date().getFullYear();
          if (formData.vehiculo_anio < 1900 || formData.vehiculo_anio > currentYear) {
            setError(`El año debe estar entre 1900 y ${currentYear}`);
            return false;
          }
          break; }

        case 3:
          {
          if (!formData.empleado_rut.trim()) {
            setError("El técnico es obligatorio");
            return false;
          }
          const exists = await isEmpleadoExists(formData.empleado_rut);
          if (!exists) {
            setError("El técnico ingresado no existe");
            return false;
          }
          if (!formData.fecha_salida) {
            setError("La fecha estimada de salida es obligatoria");
            return false;
          }
          // Validar que la fecha de salida sea posterior a hoy
          const today = new Date();
          const selectedDate = new Date(formData.fecha_salida);
          if (selectedDate < today) {
            setError("La fecha de salida debe ser posterior a hoy");
            return false;
          }
          if (!formData.descripcion.trim()) {
            setError("La descripción es obligatoria");
            return false;
          }
          if (!formData.km) {
            setError("El kilometraje actual es obligatorio");
            return false;
          }
          if (formData.km <= 0) {
            setError("El kilometraje debe ser mayor a 0");
            return false;
          }
          if (!formData.precio) {
            setError("El precio estimado es obligatorio");
            return false;
          }
          if (formData.precio <= 0) {
            setError("El precio estimado debe ser mayor a 0");
            return false;
          }
          break; }

        default:
          return true;
      }
    }
    return true;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar todos los campos antes de enviar
    if (!await validateStep(3)) return;

    try {
      const formattedData = {
        ...formData,
        km: parseInt(formData.km),
        precio: parseInt(formData.precio),
        vehiculo_anio: parseInt(formData.vehiculo_anio),
        fecha_entrada: new Date().toISOString(),
        estado_id: 1, // 1 = pendiente
      };

      const response = await addOt(id, formattedData);

      setSuccess("Orden de trabajo creada exitosamente con la ID " + response.ot_id);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error al crear la orden de trabajo";
      setError(errorMessage);
      console.error("Error al crear la orden:", err);
    } finally {
      setTimeout(() => {
        navigate("/workshops");
      }, 1000);
    }
  };

  // Función para retroceder
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    setError(""); // Limpiar errores al retroceder
  };

  // Función para avanzar
  const handleNext = async () => {
    if (await validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(3, prev + 1));
      setError(""); // Limpiar errores al avanzar exitosamente
    }
  };

  const handleBlur = async (e) => {
    if (e.target.name.startsWith("cliente_")) {
      const response = await getClienteByRut(e.target.value);
      if (response) {
        setFormData((prev) => ({
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
        setFormData((prev) => ({
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


  return (
    <div
      className={`min-h-screen pt-16 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center text-sm ${
              darkMode
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver
          </button>
          <h1 className="text-3xl font-bold mt-4">Nueva Orden de Trabajo</h1>
        </div>

        {/* Indicador de pasos */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <>
                <div
                  className={`flex items-center ${
                    currentStep >= step
                      ? "text-blue-600"
                      : darkMode
                        ? "text-gray-600"
                        : "text-gray-400"
                  }`}
                >
                  <div
                    className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                      currentStep >= step
                        ? "border-blue-600 bg-blue-600 text-white"
                        : darkMode
                          ? "border-gray-600 text-gray-600"
                          : "border-gray-400 text-gray-400"
                    }`}
                  >
                    {step}
                  </div>
                  <span className="ml-2 text-sm font-medium">
                    {step === 1
                      ? "Datos del Cliente"
                      : step === 2
                        ? "Datos del Vehículo"
                        : "Detalles de la Orden"}
                  </span>
                </div>
                {step < 3 && (
                  <div
                    className={`w-24 h-1 mx-4 ${
                      currentStep > step
                        ? "bg-blue-600"
                        : darkMode
                          ? "bg-gray-600"
                          : "bg-gray-300"
                    }`}
                  />
                )}
              </>
            ))}
          </div>
        </div>

        {/* Mensajes de error/éxito */}
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

        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          <div
            className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 ${
              darkMode ? "border border-gray-700" : "border border-gray-200"
            }`}
          >
            {/* Paso 1: Datos del Cliente */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Información del Cliente
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      RUT
                    </label>
                    <input
                      type="text"
                      name="cliente_rut"
                      value={formData.cliente_rut}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300"
                      }`}
                      placeholder="12.345.678-9"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="cliente_nombre"
                      value={formData.cliente_nombre}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300"
                      }`}
                      placeholder="Nombre del cliente"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="cliente_correo"
                        value={formData.cliente_correo}
                        onChange={handleInputChange}
                        className={`w-full pl-10 p-2 rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300"
                        }`}
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="cliente_telefono"
                        value={formData.cliente_telefono}
                        onChange={handleInputChange}
                        className={`w-full pl-10 p-2 rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300"
                        }`}
                        placeholder="+56 9 1234 5678"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Paso 2: Datos del Vehículo */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Car className="w-5 h-5 mr-2 text-blue-600" />
                  Información del Vehículo
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Patente
                    </label>
                    <input
                      type="text"
                      name="vehiculo_patente"
                      value={formData.vehiculo_patente}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300"
                      }`}
                      placeholder="XXXX99"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Marca
                    </label>
                    <input
                      type="text"
                      name="vehiculo_marca"
                      value={formData.vehiculo_marca}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300"
                      }`}
                      placeholder="Marca del vehículo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Modelo
                    </label>
                    <input
                      type="text"
                      name="vehiculo_modelo"
                      value={formData.vehiculo_modelo}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300"
                      }`}
                      placeholder="Modelo del vehículo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Año
                    </label>
                    <input
                      type="number"
                      name="vehiculo_anio"
                      value={formData.vehiculo_anio}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300"
                      }`}
                      placeholder="2023"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Color
                    </label>
                    <input
                      type="text"
                      name="vehiculo_color"
                      value={formData.vehiculo_color}
                      onChange={handleInputChange}
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300"
                      }`}
                      placeholder="Color del vehículo"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Paso 3: Datos de la Orden */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Detalles de la Orden
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Técnico Asignado
                    </label>
                    <div className="relative">
                      <wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="empleado_rut"
                        value={formData.empleado_rut}
                        onChange={handleInputChange}
                        className={`w-full pl-10 p-2 rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300"
                        }`}
                        placeholder="Rut del técnico"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Fecha Estimada de Salida
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        name="fecha_salida"
                        value={formData.fecha_salida}
                        onChange={handleInputChange}
                        className={`w-full pl-10 p-2 rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300"
                        }`}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">
                      Descripción del Servicio
                    </label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows="4"
                      className={`w-full p-2 rounded-lg border ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300"
                      }`}
                      placeholder="Descripción detallada del servicio a realizar"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Kilometraje Actual
                    </label>
                    <div className="relative">
                      <Gauge className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="km"
                        value={formData.km}
                        onChange={handleInputChange}
                        className={`w-full pl-10 p-2 rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300"
                        }`}
                        placeholder="Kilometraje actual"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Precio Estimado
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleInputChange}
                        className={`w-full pl-10 p-2 rounded-lg border ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300"
                        }`}
                        placeholder="Precio estimado"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de navegación */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    darkMode
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Anterior
                </button>
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="ml-auto flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Siguiente
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-auto flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Crear Orden
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
