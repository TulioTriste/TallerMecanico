import React from "react";
import { FaTools, FaUsers, FaCar, FaBell, FaChartLine } from "react-icons/fa";
import { BsShop, BsBuilding, BsBuildingsFill } from "react-icons/bs";
import { useDarkMode } from "../../context/darkModeContext.jsx";
import Footer from "../../Components/Footer.jsx";
import Navbar from "../../Components/NavbarPrincipal/PublicNavbar.jsx";

const AboutSoftware = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
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
                  title="Talleres Pequeños"
                  description="Perfecto para talleres que están comenzando o tienen una operación pequeña"
                  features={[
                    "Hasta 3 usuarios",
                    "Gestión básica de clientes",
                    "Órdenes de trabajo ilimitadas",
                  ]}
                  darkMode={darkMode}
                />
                <PlanCard
                  icon={<BsBuilding />}
                  title="Talleres Medianos"
                  description="Ideal para talleres establecidos que buscan crecer"
                  features={[
                    "Hasta 10 usuarios",
                    "Gestión avanzada de clientes",
                    "Reportes detallados",
                  ]}
                  darkMode={darkMode}
                />
                <PlanCard
                  icon={<BsBuildingsFill />}
                  title="Cadena de Talleres"
                  description="Solución completa para grandes operaciones"
                  features={[
                    "Usuarios ilimitados",
                    "Gestión multi-sucursal",
                    "Análisis avanzado",
                  ]}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <h2
              className={`text-3xl font-bold text-center mb-12 ${darkMode ? "text-white" : "text-gray-900"}`}
            >
              ¿Por qué Elegirnos?
            </h2>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <StatCard
                number="98%"
                text="de satisfacción"
                darkMode={darkMode}
              />
              <StatCard
                number="50%"
                text="más eficiencia"
                darkMode={darkMode}
              />
              <StatCard
                number="1000+"
                text="talleres confían en nosotros"
                darkMode={darkMode}
              />
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

const PlanCard = ({ icon, title, description, features, darkMode }) => (
  <div
    className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"} transition-colors duration-300`}
  >
    <div
      className={`text-4xl mb-4 flex justify-center ${darkMode ? "text-blue-400" : "text-blue-600"}`}
    >
      {icon}
    </div>
    <h3
      className={`text-xl font-bold mb-2 text-center ${darkMode ? "text-white" : "text-gray-900"}`}
    >
      {title}
    </h3>
    <p
      className={`mb-4 text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}
    >
      {description}
    </p>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <svg
            className={`w-4 h-4 mr-2 ${darkMode ? "text-green-400" : "text-green-500"}`}
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
  </div>
);

const StatCard = ({ number, text, darkMode }) => (
  <div>
    <div
      className={`text-4xl font-bold mb-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`}
    >
      {number}
    </div>
    <div className={darkMode ? "text-gray-400" : "text-gray-600"}>{text}</div>
  </div>
);

export default AboutSoftware;
