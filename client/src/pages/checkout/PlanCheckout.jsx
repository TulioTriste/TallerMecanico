import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Shield, CreditCard, Check, ArrowLeft } from "lucide-react";
import { useDarkMode } from "../../context/darkModeContext";

const PlanCheckout = () => {
  const { darkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Esta información vendría de la página anterior a través del estado de la navegación
  const planDetails = location.state?.planDetails || {
    name: "Plan Profesional",
    price: "$49.99",
    cycle: "monthly",
    features: [
      "Gestión de clientes",
      "Control de inventario avanzado",
      "Facturación completa",
      "Agenda de citas",
      "Historial de servicios",
      "Soporte prioritario",
      "Diagnósticos avanzados",
      "Integración con proveedores",
    ],
  };

  const paymentMethods = [
    {
      id: "webpay",
      name: "WebPay",
      description: "Pago seguro con WebPay de Transbank",
      logo: "/path-to-webpay-logo.png", // Necesitarás agregar las imágenes
    },
    {
      id: "mercadopago",
      name: "MercadoPago",
      description: "Pago fácil y seguro con MercadoPago",
      logo: "/path-to-mercadopago-logo.png", // Necesitarás agregar las imágenes
    },
  ];

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para procesar el pago según el método seleccionado
    console.log("Procesando pago con:", selectedPaymentMethod);
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Botón Volver */}
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center mb-8 ${
            darkMode
              ? "text-gray-300 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver a Planes
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {/* Resumen del Plan */}
          <div className="space-y-8">
            <div
              className={`p-6 rounded-lg ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <h2 className="text-2xl font-bold mb-6">Resumen de la Orden</h2>

              {/* Detalles del Plan */}
              <div className="flex items-start mb-6">
                <Shield className="w-12 h-12 text-blue-500 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold">{planDetails.name}</h3>
                  <div className="flex items-baseline mt-2">
                    <span className="text-2xl font-bold">
                      {planDetails.price}
                    </span>
                    <span className="ml-2 text-gray-500">
                      /{planDetails.cycle}
                    </span>
                  </div>
                </div>
              </div>

              {/* Lista de Características */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                {planDetails.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Información Adicional */}
            <div
              className={`p-6 rounded-lg ${
                darkMode
                  ? "bg-blue-900/30 border border-blue-800"
                  : "bg-blue-50"
              }`}
            >
              <h3 className="font-medium mb-2">Información Importante</h3>
              <ul className="text-sm space-y-2">
                <li>• Facturación recurrente, cancela cuando quieras</li>
                <li>• 14 días de prueba gratuita</li>
                <li>• Soporte técnico incluido</li>
              </ul>
            </div>
          </div>

          {/* Formulario de Pago */}
          <div
            className={`p-8 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-white"
            } shadow-lg`}
          >
            <h2 className="text-2xl font-bold mb-8">Método de Pago</h2>

            <form onSubmit={handlePaymentSubmit}>
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`block relative rounded-lg border-2 p-4 cursor-pointer transition-all ${
                      selectedPaymentMethod === method.id
                        ? darkMode
                          ? "border-blue-500 bg-blue-900/20"
                          : "border-blue-500 bg-blue-50"
                        : darkMode
                          ? "border-gray-700 hover:border-gray-600"
                          : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="payment-method"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium">{method.name}</h3>
                        <p
                          className={`text-sm ${
                            darkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                disabled={!selectedPaymentMethod}
                className={`mt-8 w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${
                  selectedPaymentMethod
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceder al Pago
              </button>
            </form>

            {/* Sello de Seguridad */}
            <div className="mt-8 text-center">
              <div
                className={`inline-flex items-center ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm">Pago 100% seguro y encriptado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCheckout;
