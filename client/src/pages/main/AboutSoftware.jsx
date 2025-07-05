import React from "react";
import { FaTools, FaUsers, FaCar, FaBell } from "react-icons/fa";
import { BsShop, BsBuilding, BsBuildingsFill } from "react-icons/bs";
import { useDarkMode } from "../../context/darkModeContext.jsx";
import Footer from "../../Components/Footer.jsx";
import { useNavigate } from "react-router-dom";

const AboutSoftware = () => {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> eliminado, el navbar lo maneja NavbarManager globalmente */}
      <div
        className={`flex-grow ${darkMode ? "bg-gray-900" : "bg-gray-50"} transition-colors duration-300`}
      >
        {/* Ajustamos el espaciado superior para compensar el navbar fijo */}
        <div className="pt-16">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Revoluciona la Gestión de tu Taller Mecánico
              </h1>
              <p className="text-xl mb-8">
                Deja atrás el papel y digitaliza tu negocio con nuestra solución
                integral
              </p>
            </div>
          </div>

          {/* Características Principales */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2
              className={`text-3xl font-bold text-center mb-12 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              Todo lo que Necesitas en Un Solo Lugar
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard
                icon={<FaUsers />}
                title="Gestión de Clientes"
                description="Mantén toda la información de tus clientes organizada y accesible"
                darkMode={darkMode}
              />
              <FeatureCard
                icon={<FaCar />}
                title="Control de Vehículos"
                description="Registro detallado de cada vehículo y su historial de servicios"
                darkMode={darkMode}
              />
              <FeatureCard
                icon={<FaTools />}
                title="Órdenes de Trabajo"
                description="Crea y gestiona órdenes de trabajo de manera eficiente"
                darkMode={darkMode}
              />
              <FeatureCard
                icon={<FaBell />}
                title="Alertas Personalizadas"
                description="Mantente informado de todo lo importante en tu taller"
                darkMode={darkMode}
              />
            </div>
          </div>

          {/* Planes */}
          <div
            className={`py-16 ${darkMode ? "bg-gray-800/50" : "bg-gray-100"}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2
                className={`text-3xl font-bold text-center mb-12 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
                Planes Adaptados a tu Negocio
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <PlanCard
                  icon={<BsShop />}
                  title="Plan Básico"
                  price="$14.990"
                  priceDetail="/mes"
                  description="Ideal para talleres pequeños o mecánicos independientes - Gestiona 1 taller"
                  features={[
                    "Gestión de clientes",
                    "Agenda de citas",
                    "Órdenes de trabajo",
                    "Control de roles y permisos",
                    "Hasta 1 taller",
                    "Integración avanzada con WhatsApp ❌",
                  ]}
                  buttonText="Elegir Plan Básico"
                  highlight={false}
                  darkMode={darkMode}
                  onButtonClick={() => navigate("/plans")}
                />
                <PlanCard
                  icon={<BsBuilding />}
                  title="Plan Profesional"
                  price="$39.990"
                  priceDetail="/mes"
                  description="Perfecto para talleres medianos - Gestiona hasta 5 talleres"
                  features={[
                    "Todas las características del Plan Básico",
                    "Hasta 5 talleres",
                    "Integración avanzada con WhatsApp",
                    "Notificaciones automáticas",
                    "Panel de control multi-taller",
                    "Soporte prioritario extendido",
                    "Capacitación personalizada",
                    "Métricas de rendimiento (próximamente) ❌",
                    "Reportes avanzados (próximamente) ❌",
                  ]}
                  buttonText="Elegir Plan Profesional"
                  highlight={true}
                  darkMode={darkMode}
                  onButtonClick={() => navigate("/plans")}
                />
                <PlanCard
                  icon={<BsBuildingsFill />}
                  title="Plan Premium"
                  price="$69.990"
                  priceDetail="/mes"
                  description="Solución empresarial exclusiva - Gestiona hasta 30 talleres"
                  features={[
                    "Todas las características del Plan Profesional",
                    "Hasta 30 talleres",
                    "Soporte técnico 24/7 dedicado",
                    "Dashboard empresarial",
                    "API personalizada",
                    "Respaldo de datos avanzado",
                    "Integraciones personalizadas",
                    "Asesoría estratégica mensual",
                    "Métricas de rendimiento (próximamente)",
                    "Reportes avanzados (próximamente)",
                  ]}
                  buttonText="Contactar Ventas"
                  highlight={false}
                  darkMode={darkMode}
                  onButtonClick={() => navigate("/plans")}
                />
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold mb-6">
                Comienza a Usar Nuestro Software Hoy
              </h2>
              <p className="text-xl mb-8">
                Únete a los cientos de talleres que ya han modernizado su
                gestión
              </p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                Comienza ya a digitalizar tu taller!
              </button>
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

// Componentes auxiliares
const FeatureCard = ({ icon, title, description, darkMode }) => (
  <div
    className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"} transition-colors duration-300`}
  >
    <div
      className={`text-4xl mb-4 flex justify-center ${darkMode ? "text-blue-400" : "text-blue-600"}`}
    >
      {icon}
    </div>
    <h3
      className={`text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
    >
      {title}
    </h3>
    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
      {description}
    </p>
  </div>
);

const PlanCard = ({
  icon,
  title,
  description,
  features,
  price,
  priceDetail,
  buttonText,
  highlight,
  darkMode,
  onButtonClick,
}) => (
  <div
    className={`p-6 rounded-lg shadow-lg relative flex flex-col items-center ${
      highlight
        ? darkMode
          ? "bg-blue-900 border-2 border-blue-400"
          : "bg-blue-100 border-2 border-blue-600"
        : darkMode
        ? "bg-gray-800"
        : "bg-white"
    } transition-colors duration-300`}
  >
    {highlight && (
      <span
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
          darkMode
            ? "bg-blue-400 text-blue-900"
            : "bg-blue-600 text-white"
        }`}
      >
        MÁS POPULAR
      </span>
    )}
    <div
      className={`text-4xl mb-4 flex justify-center ${
        darkMode ? "text-blue-400" : "text-blue-600"
      }`}
    >
      {icon}
    </div>
    <h3
      className={`text-xl font-bold mb-2 text-center ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      {title}
    </h3>
    {price && (
      <div className="flex items-end justify-center mb-2">
        <span
          className={`text-3xl font-bold ${
            darkMode ? "text-white" : "text-blue-700"
          }`}
        >
          {price}
        </span>
        <span
          className={`ml-1 text-base ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {priceDetail}
        </span>
      </div>
    )}
    <p
      className={`mb-4 text-center ${
        darkMode ? "text-gray-400" : "text-gray-600"
      }`}
    >
      {description}
    </p>
    <ul className="space-y-2 mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <svg
            className={`w-4 h-4 mr-2 ${
              darkMode ? "text-green-400" : "text-green-500"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
            {feature}
          </span>
        </li>
      ))}
    </ul>
    <button
      className={`w-full py-2 rounded-lg font-bold transition-colors ${
        highlight
          ? darkMode
            ? "bg-blue-400 text-blue-900 hover:bg-blue-300"
            : "bg-blue-600 text-white hover:bg-blue-700"
          : darkMode
          ? "bg-gray-700 text-white hover:bg-gray-600"
          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
      }`}
      onClick={onButtonClick}
    >
      {buttonText}
    </button>
  </div>
);

export default AboutSoftware;
