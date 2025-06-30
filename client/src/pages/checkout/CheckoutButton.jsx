import { useState } from "react";
import {createPreferenceRequest} from "../../api/payments.js";
import {CreditCard} from "lucide-react";

const CheckoutButton = ({ selectedPaymentMethod, product, user, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const data = {
        item: {
          title: product.name,
          price: product.price,
          description: product.features,
          cycle: "months",
          frecuency: product.cycle === "monthly" ? 1 : 12,
          currency_id: "CLP",
          plan_id: product.plan_id,
        },
        payer: {
          name: user.nombre,
          surname: user.apellido,
          email: user.correo,
        }
      };
      const response = await createPreferenceRequest(data);
      window.location.href = response.data.init_point;

      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      console.error("Error al iniciar el checkout:", error);
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`mt-8 w-full flex items-center justify-center py-3 px-4 rounded-lg text-white font-medium transition-all ${
        selectedPaymentMethod
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-400 cursor-not-allowed"
      }`}
    >

      {loading ?
        "Procesando..." :
        "Proceder al Pago"
      }
    </button>
  );
};

export default CheckoutButton;