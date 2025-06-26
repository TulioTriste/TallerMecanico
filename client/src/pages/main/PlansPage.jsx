import { useState } from "react";
import { Check, X, Zap, Shield, Wrench, ArrowRight } from "lucide-react";
import Navbar from "../../Components/NavbarPrincipal/PublicNavbar.jsx";
import { useDarkMode } from "../../context/darkModeContext.jsx";
import { useNavigate } from "react-router-dom";
import StringFormatter from "../../utilities/stringFormatter.js";

export default function PricingDashboard() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const {darkMode} = useDarkMode();

  const navigate = useNavigate();

  const plans = [
    {
      plan_id: 1,
      name: "Plan Básico",
      icon: <Wrench className="w-8 h-8 text-blue-500"/>,
      description: "Ideal para talleres pequeños o mecánicos independientes",
      monthlyPrice: 29990,
      yearlyPrice: 290990,
      savings: "Save $" + StringFormatter.formatNumber(29990 * 12 - 290990),
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
      popular: false,
    },
    {
      plan_id: 2,
      name: "Plan Profesional",
      icon: <Zap className="w-8 h-8 text-indigo-500"/>,
      description: "Perfecto para talleres medianos con múltiples mecánicos",
      monthlyPrice: 49990,
      yearlyPrice: 490990,
      savings: "Save $" + StringFormatter.formatNumber(49990 * 12 - 490990),
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
      popular: true,
    },
    {
      plan_id: 3,
      name: "Plan Premium",
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      description:
        "Para grandes talleres y concesionarios con múltiples sucursales",
      monthlyPrice: 79990,
      yearlyPrice: 790990,
      savings: "Save $" + StringFormatter.formatNumber(79990 * 12 - 790990),
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
      popular: false,
    },
  ];

  // Animated tooltip for selected plan
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // En PlansPage.jsx, modifica la función selectPlan:
  const selectPlan = (index) => {
    setSelectedPlan(index);
    setTooltipVisible(true);

    // Preparar los detalles del plan para el checkout
    const selectedPlanDetails = {
      plan_id: plans[index].plan_id,
      name: plans[index].name,
      price:
        billingCycle === "monthly"
          ? plans[index].monthlyPrice
          : plans[index].yearlyPrice,
      cycle: billingCycle,
      features: plans[index].features
        .filter((f) => f.included)
        .map((f) => f.name),
    };

    // Redireccionar al checkout con los detalles del plan
    navigate("/checkout", { state: { planDetails: selectedPlanDetails } });
  };

  return (
    <>
      <Navbar />
      <div
        className={`w-full min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"} py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 flex flex-col`}
      >
        <div className="max-w-6xl mx-auto w-full flex-grow">
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"} mb-4 transition-colors duration-300`}
            >
              Planes de Precios Flexibles
            </h2>
            <p
              className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto transition-colors duration-300`}
            >
              Elija el plan perfecto para su taller mecánico y optimice sus
              operaciones diarias
            </p>

            {/* Billing toggle */}
            <div
              className={`mt-8 inline-flex items-center ${darkMode ? "bg-gray-800" : "bg-white"} p-1 rounded-full border ${darkMode ? "border-gray-700" : "border-gray-200"} shadow-sm transition-colors duration-300`}
            >
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  billingCycle === "monthly"
                    ? "bg-blue-600 text-white shadow-md"
                    : `${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`
                }`}
              >
                Facturación Mensual
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                  billingCycle === "yearly"
                    ? "bg-blue-600 text-white shadow-md"
                    : `${darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}`
                }`}
              >
                Facturación Anual{" "}
                <span className="text-xs font-normal">(-17%)</span>
              </button>
            </div>
          </div>

          {/* Plans grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan, index) => {
              // Calcular los colores dinámicamente basado en el tema del sistema
              const cardBackground = darkMode
                ? index === 0
                  ? "bg-blue-900/30"
                  : index === 1
                    ? "bg-indigo-900/30"
                    : "bg-purple-900/30"
                : index === 0
                  ? "bg-blue-100"
                  : index === 1
                    ? "bg-indigo-100"
                    : "bg-purple-100";

              const cardBorder = darkMode
                ? index === 0
                  ? "border-blue-700/50"
                  : index === 1
                    ? "border-indigo-700/50"
                    : "border-purple-700/50"
                : index === 0
                  ? "border-blue-300"
                  : index === 1
                    ? "border-indigo-300"
                    : "border-purple-300";

              return (
                <div
                  key={index}
                  className={`relative rounded-2xl border-2 transition-all ${
                    selectedPlan === index ? "border-blue-500" : cardBorder
                  } ${cardBackground} p-6 overflow-hidden ${
                    selectedPlan === index
                      ? "shadow-xl transform scale-105"
                      : "shadow hover:shadow-lg"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold py-1 px-4 rounded-bl-lg">
                        MÁS POPULAR
                      </div>
                    </div>
                  )}

                  <div className="flex items-center mb-4">
                    <div
                      className={`p-3 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} mr-4 transition-colors duration-300`}
                    >
                      {plan.icon}
                    </div>
                    <h3
                      className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
                    >
                      {plan.name}
                    </h3>
                  </div>

                  <p
                    className={`${darkMode ? "text-gray-300" : "text-gray-600"} text-sm mb-4 transition-colors duration-300`}
                  >
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-end">
                      <span
                        className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"} transition-colors duration-300`}
                      >
                        ${StringFormatter.formatNumber(
                          billingCycle === "monthly"
                            ? plan.monthlyPrice
                            : plan.yearlyPrice)}
                      </span>
                      <span
                        className={`${darkMode ? "text-gray-400" : "text-gray-500"} ml-2 pb-1 transition-colors duration-300`}
                      >
                        {billingCycle === "monthly" ? "/mes" : "/año"}
                      </span>
                    </div>
                    {billingCycle === "yearly" && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        {plan.savings} anualmente
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 mr-2 flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm ${
                            feature.included
                              ? darkMode
                                ? "text-gray-200"
                                : "text-gray-700"
                              : "text-gray-500"
                          } transition-colors duration-300`}
                        >
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => selectPlan(index)}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${
                      selectedPlan === index
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md"
                        : darkMode
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Selected plan notification */}
          {selectedPlan !== null && (
            <div
              className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg transition-all ${
                tooltipVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10 pointer-events-none"
              }`}
            >
              Ha seleccionado el {plans[selectedPlan].name}
            </div>
          )}

          {/* Features comparison note */}
          <div className="text-center mt-12">
            <p
              className={`${darkMode ? "text-gray-300" : "text-gray-600"} transition-colors duration-300`}
            >
              ¿Necesita ver una comparación completa de características?{" "}
              <a
                href="#"
                className="text-blue-600 font-medium hover:text-blue-500"
              >
                Ver tabla comparativa
              </a>
            </p>

            <div
              className={`mt-8 ${darkMode ? "bg-blue-900/50 border-blue-800" : "bg-blue-50 border-blue-200"} border rounded-lg p-4 max-w-2xl mx-auto transition-colors duration-300`}
            >
              <p
                className={`text-sm ${darkMode ? "text-blue-200" : "text-blue-800"} transition-colors duration-300`}
              >
                Todos los planes incluyen una prueba gratuita de 14 días. No se
                requiere tarjeta de crédito hasta que decida continuar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
