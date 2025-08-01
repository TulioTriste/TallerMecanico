import {useEffect, useState} from "react";
import {
  ArrowRight,
  Bell,
  Calendar,
  Car,
  Check,
  ChevronRight,
  Clipboard,
  FileText,
  Shield,
  Users,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import {useDarkMode} from "../../context/darkModeContext.jsx";
import {useControlPanel} from "../../context/controlPanelContext.jsx";
import Footer from "../../Components/Footer.jsx";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const {darkMode} = useDarkMode();
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  // Agregar estado para controlar la visibilidad antes de que se complete la hidratación
  const [isClient, setIsClient] = useState(false);

  const {registeredVehicles, clientesCount, ordenesActivas, citasTotalHoy} = useControlPanel();
  const navigate = useNavigate();

  // Marcar que estamos en el cliente cuando el componente se monta
  useEffect(() => {
    setIsClient(true);
  }, []);

  const selectPlan = (index) => {
    setSelectedPlan(index);
    setTooltipVisible(true);
    setTimeout(() => setTooltipVisible(false), 3000);
  };

  // Servicios que ofrecemos
  const services = [
    {
      name: "Gestión de órdenes de trabajo",
      icon: <Clipboard className="w-6 h-6"/>,
      description:
        "Control completo de órdenes de trabajo, desde la creación hasta la facturación.",
    },
    {
      name: "Gestión de vehículos",
      icon: <Car className="w-6 h-6"/>,
      description:
        "Registro detallado de vehículos con historial completo de servicios.",
    },
    {
      name: "Notificaciones automáticas",
      icon: <Bell className="w-6 h-6"/>,
      description:
        "Avisos automáticos a clientes sobre estado de reparaciones y mantenimientos.",
    },
    {
      name: "Historial de reparaciones",
      icon: <Wrench className="w-6 h-6"/>,
      description:
        "Acceso instantáneo al historial completo de reparaciones de cada vehículo.",
    },
    {
      name: "Registro de clientes",
      icon: <Users className="w-6 h-6"/>,
      description:
        "Base de datos centralizada de clientes con información de contacto y preferencias.",
    },
    {
      name: "Reportes de mantención",
      icon: <FileText className="w-6 h-6"/>,
      description:
        "Generación de reportes detallados de mantenimiento para clientes y control interno.",
    },
  ];

  // Planes de precios (manteniendo los mismos de la referencia)
  const plans = [
    {
      name: "Plan Básico",
      icon: <Wrench className="w-8 h-8 text-blue-500"/>,
      description: "Ideal para talleres pequeños o mecánicos independientes",
      monthlyPrice: "$29.99",
      yearlyPrice: "$299.90",
      savings: "Save $60",
      features: [
        {name: "Gestión de clientes", included: true},
        {name: "Control de inventario básico", included: true},
        {name: "Facturación simple", included: true},
        {name: "Agenda de citas", included: true},
        {name: "Historial de servicios", included: true},
        {name: "Soporte por email", included: true},
        {name: "Diagnósticos avanzados", included: false},
        {name: "Integración con proveedores", included: false},
      ],
      ctaText: "Iniciar Prueba Gratuita",
      color: "bg-blue-100 border-blue-300",
      darkColor: "bg-blue-900 bg-opacity-30 border-blue-700",
      popular: false,
    },
    {
      name: "Plan Profesional",
      icon: <Zap className="w-8 h-8 text-indigo-500"/>,
      description: "Perfecto para talleres medianos con múltiples mecánicos",
      monthlyPrice: "$49.99",
      yearlyPrice: "$499.90",
      savings: "Save $100",
      features: [
        {name: "Gestión de clientes", included: true},
        {name: "Control de inventario avanzado", included: true},
        {name: "Facturación completa", included: true},
        {name: "Agenda de citas", included: true},
        {name: "Historial de servicios", included: true},
        {name: "Soporte prioritario", included: true},
        {name: "Diagnósticos avanzados", included: true},
        {name: "Integración con proveedores", included: true},
      ],
      ctaText: "Elegir Plan Profesional",
      color: "bg-indigo-100 border-indigo-300",
      darkColor: "bg-indigo-900 bg-opacity-30 border-indigo-700",
      popular: true,
    },
    {
      name: "Plan Premium",
      icon: <Shield className="w-8 h-8 text-purple-500"/>,
      description:
        "Para grandes talleres y concesionarios con múltiples sucursales",
      monthlyPrice: "$79.99",
      yearlyPrice: "$799.90",
      savings: "Save $160",
      features: [
        {name: "Gestión de clientes", included: true},
        {name: "Control de inventario premium", included: true},
        {name: "Facturación completa", included: true},
        {name: "Agenda de citas inteligente", included: true},
        {name: "Historial de servicios detallado", included: true},
        {name: "Soporte 24/7 dedicado", included: true},
        {name: "Diagnósticos avanzados con IA", included: true},
        {name: "Ecosistema completo de integraciones", included: true},
      ],
      ctaText: "Contactar Ventas",
      color: "bg-purple-100 border-purple-300",
      darkColor: "bg-purple-900 bg-opacity-30 border-purple-700",
      popular: false,
    },
  ];

  // Ocultar el contenido hasta que estemos en el cliente para evitar parpadeo
  if (!isClient) {
    return (
      <div
        className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      ></div>
    );
  }
  return (
    <>
      <div
        className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <div
          className={`min-h-screen flex items-center justify-center relative py-8 px-6 sm:px-8 ${darkMode ? "bg-gray-900" : "bg-white"}`}
        >
          <div
            className={`min-h-screen flex items-center justify-center relative py-8 px-6 sm:px-8 ${darkMode ? "bg-gray-900" : "bg-white"}`}
          >
            {/* Elementos decorativos de fondo */}
            <div
              className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
            >
              <div
                className={`absolute -top-24 -right-24 w-96 h-96 rounded-full ${darkMode ? "bg-blue-900/10" : "bg-blue-100/50"} blur-3xl`}
              ></div>
              <div
                className={`absolute top-1/2 -left-48 w-96 h-96 rounded-full ${darkMode ? "bg-indigo-900/10" : "bg-indigo-100/50"} blur-3xl`}
              ></div>
            </div>

            {/* Contenido principal del hero */}
            <div className="max-w-7xl mx-auto w-full z-10">
              <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-2/5 space-y-6">
                  <div
                    className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-800"}`}
                  >
                    Optimice su TallerConectados
                  </div>

                  <h1
                    className={`text-4xl sm:text-5xl font-bold leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    Software Integral para{" "}
                    <span className="text-blue-600">Talleres Mecanicos</span>
                  </h1>

                  <p
                    className={`text-xl ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    Una plataforma completa para gestionar clientes, vehículos,
                    órdenes de trabajo, cotizaciones y más.
                  </p>

                  <div className="flex flex-wrap gap-4 pt-6">
                    <button
                      className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-lg shadow-blue-500/20"
                      onClick={() => navigate("/plans")}
                    >
                      Contratar plan
                    </button>
                    <button
                      className={`px-8 py-3 rounded-lg flex items-center gap-2 ${darkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-white hover:bg-gray-50 text-gray-800"} font-medium transition-colors shadow`}
                      onClick={() => window.open("http://localhost:5173/sobre-software", "_self")}
                    >
                      Ver características
                      <ChevronRight className="w-4 h-4"/>
                    </button>
                  </div>
                </div>

                <div className="lg:w-3/5 w-full">
                  <div
                    className={`relative rounded-2xl overflow-hidden shadow-2xl w-full ${darkMode ? "bg-gray-800 shadow-blue-900/20" : "bg-white shadow-gray-200/80"}`}
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-2 ${darkMode ? "bg-gradient-to-r from-blue-600 to-indigo-600" : "bg-gradient-to-r from-blue-500 to-indigo-500"}`}
                    ></div>
                    <div className="p-4 sm:p-6 md:p-8">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <Wrench
                              className={`h-6 w-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
                            />
                            <h3 className="text-lg font-semibold">
                              Panel de Control
                            </h3>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        </div>
                      </div>

                      {/* 4 parámetros en forma de cuadrado (grid 2x2 en desktop, 1x4 en móvil) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                          className={`rounded-lg p-4 flex items-center gap-4 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                        >
                          <Car
                            className={`w-12 h-12 p-2 rounded-lg ${darkMode ? "bg-blue-900/40 text-blue-400" : "bg-blue-100 text-blue-600"}`}
                          />
                          <div>
                            <h4 className="font-medium">
                              Vehículos registrados
                            </h4>
                            <p className="text-2xl font-bold">
                              {registeredVehicles}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`rounded-lg p-4 flex items-center gap-4 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                        >
                          <Clipboard
                            className={`w-12 h-12 p-2 rounded-lg ${darkMode ? "bg-green-900/40 text-green-400" : "bg-green-100 text-green-600"}`}
                          />
                          <div>
                            <h4 className="font-medium">Órdenes activas</h4>
                            <p className="text-2xl font-bold">
                              {ordenesActivas}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`rounded-lg p-4 flex items-center gap-4 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                        >
                          <Users
                            className={`w-12 h-12 p-2 rounded-lg ${darkMode ? "bg-purple-900/40 text-purple-400" : "bg-purple-100 text-purple-600"}`}
                          />
                          <div>
                            <h4 className="font-medium">
                              Clientes fidelizados
                            </h4>
                            <p className="text-2xl font-bold">
                              {clientesCount}
                            </p>
                          </div>
                        </div>

                        <div
                          className={`rounded-lg p-4 flex items-center gap-4 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}
                        >
                          <Calendar
                            className={`w-12 h-12 p-2 rounded-lg ${darkMode ? "bg-orange-900/40 text-orange-400" : "bg-orange-100 text-orange-600"}`}
                          />
                          <div>
                            <h4 className="font-medium">Citas programadas</h4>
                            <p className="text-2xl font-bold">
                              {citasTotalHoy}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Características Principales con diseño profesional y ordenado */}
        <div
          className={`py-20 px-6 sm:px-8 ${darkMode ? "bg-gray-900" : "bg-white"}`}
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div
                className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-800"}`}
              >
                Soluciones Integrales
              </div>
              <h2
                className={`text-3xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Características Principales de TallerConectados
              </h2>
              <p
                className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-600"}`}
              >
                Descubra cómo nuestra plataforma puede transformar la gestión de
                su taller mecánico
              </p>
            </div>

            {/* Estructura ordenada de 2 columnas grandes y 4 características más pequeñas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Característica principal 1 */}
              <div
                className={`p-6 rounded-xl transition-all hover:shadow-lg ${darkMode ? "bg-blue-900/20 hover:shadow-blue-900/30" : "bg-blue-50 hover:shadow-blue-200/50"}`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-xl ${darkMode ? "bg-blue-900/40 text-blue-400" : "bg-blue-100 text-blue-600"}`}
                    >
                      {services[0].icon}
                    </div>
                    <h3
                      className={`text-xl font-semibold ml-4 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {services[0].name}
                    </h3>
                  </div>

                  <p
                    className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {services[0].description}
                  </p>

                  <div className="mt-auto pt-2">
                    <a
                      href="#"
                      className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? "bg-blue-800 hover:bg-blue-700 text-white" : "bg-blue-100 hover:bg-blue-200 text-blue-700"} transition-colors`}
                    >
                      Explorar funcionalidad
                      <ArrowRight className="w-4 h-4 ml-2"/>
                    </a>
                  </div>
                </div>
              </div>

              {/* Característica principal 2 */}
              <div
                className={`p-6 rounded-xl transition-all hover:shadow-lg ${darkMode ? "bg-indigo-900/20 hover:shadow-indigo-900/30" : "bg-indigo-50 hover:shadow-indigo-200/50"}`}
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 flex items-center justify-center rounded-xl ${darkMode ? "bg-indigo-900/40 text-indigo-400" : "bg-indigo-100 text-indigo-600"}`}
                    >
                      {services[1].icon}
                    </div>
                    <h3
                      className={`text-xl font-semibold ml-4 ${darkMode ? "text-white" : "text-gray-900"}`}
                    >
                      {services[1].name}
                    </h3>
                  </div>

                  <p
                    className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {services[1].description}
                  </p>

                  <div className="mt-auto pt-2">
                    <a
                      href="#"
                      className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? "bg-indigo-800 hover:bg-indigo-700 text-white" : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"} transition-colors`}
                    >
                      Saber más
                      <ArrowRight className="w-4 h-4 ml-2"/>
                    </a>
                  </div>
                </div>
              </div>

              {/* Características secundarias en una cuadrícula uniforme */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                {/* Característica 3 */}
                <div
                  className={`p-5 rounded-xl transition-all hover:shadow-md ${darkMode ? "bg-green-900/20 hover:shadow-green-900/30" : "bg-green-50 hover:shadow-green-200/50"}`}
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${darkMode ? "bg-green-900/40 text-green-400" : "bg-green-100 text-green-600"}`}
                  >
                    {services[2].icon}
                  </div>

                  <h3
                    className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {services[2].name}
                  </h3>

                  <p
                    className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {services[2].description}
                  </p>

                  <a
                    href="#"
                    className={`inline-flex items-center text-sm font-medium ${darkMode ? "text-green-400" : "text-green-600"} hover:opacity-80 transition-opacity`}
                  >
                    Detalles
                    <ChevronRight className="w-4 h-4 ml-1"/>
                  </a>
                </div>

                {/* Característica 4 */}
                <div
                  className={`p-5 rounded-xl transition-all hover:shadow-md ${darkMode ? "bg-purple-900/20 hover:shadow-purple-900/30" : "bg-purple-50 hover:shadow-purple-200/50"}`}
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${darkMode ? "bg-purple-900/40 text-purple-400" : "bg-purple-100 text-purple-600"}`}
                  >
                    {services[3].icon}
                  </div>

                  <h3
                    className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {services[3].name}
                  </h3>

                  <p
                    className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {services[3].description}
                  </p>

                  <a
                    href="#"
                    className={`inline-flex items-center text-sm font-medium ${darkMode ? "text-purple-400" : "text-purple-600"} hover:opacity-80 transition-opacity`}
                  >
                    Ver ejemplo
                    <ChevronRight className="w-4 h-4 ml-1"/>
                  </a>
                </div>

                {/* Característica 5 */}
                <div
                  className={`p-5 rounded-xl transition-all hover:shadow-md ${darkMode ? "bg-orange-900/20 hover:shadow-orange-900/30" : "bg-orange-50 hover:shadow-orange-200/50"}`}
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${darkMode ? "bg-orange-900/40 text-orange-400" : "bg-orange-100 text-orange-600"}`}
                  >
                    {services[4].icon}
                  </div>

                  <h3
                    className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {services[4].name}
                  </h3>

                  <p
                    className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {services[4].description}
                  </p>

                  <a
                    href="#"
                    className={`inline-flex items-center text-sm font-medium ${darkMode ? "text-orange-400" : "text-orange-600"} hover:opacity-80 transition-opacity`}
                  >
                    Cómo funciona
                    <ChevronRight className="w-4 h-4 ml-1"/>
                  </a>
                </div>

                {/* Característica 6 */}
                <div
                  className={`p-5 rounded-xl transition-all hover:shadow-md ${darkMode ? "bg-pink-900/20 hover:shadow-pink-900/30" : "bg-pink-50 hover:shadow-pink-200/50"}`}
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${darkMode ? "bg-pink-900/40 text-pink-400" : "bg-pink-100 text-pink-600"}`}
                  >
                    {services[5].icon}
                  </div>

                  <h3
                    className={`text-lg font-semibold mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}
                  >
                    {services[5].name}
                  </h3>

                  <p
                    className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                  >
                    {services[5].description}
                  </p>

                  <a
                    href="#"
                    className={`inline-flex items-center text-sm font-medium ${darkMode ? "text-pink-400" : "text-pink-600"} hover:opacity-80 transition-opacity`}
                  >
                    Descubrir más
                    <ChevronRight className="w-4 h-4 ml-1"/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer/>
      </div>
    </>
  );
}
