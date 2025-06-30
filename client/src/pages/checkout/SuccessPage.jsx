import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {getPaymentStatusRequest} from "../../api/payments.js";

const SuccessPage = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const paymentId = params.get("payment_id");

        if (paymentId) {
          const response = await getPaymentStatusRequest(paymentId);
          console.log(
            "Respuesta del servidor:",
            response.data
          )
          setPaymentInfo(response.data);
        }
      } catch (error) {
        console.error("Error al obtener información del pago:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentInfo();
  }, [location]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">¡Pago exitoso!</h1>

        {loading ? (
          <p>Cargando información del pago...</p>
        ) : (
          <div>
            {paymentInfo ? (
              <div className="text-left mt-4">
                <p><strong>ID de pago:</strong> {paymentInfo.id}</p>
                <p><strong>Estado:</strong> {paymentInfo.status}</p>
                <p><strong>Monto:</strong> ${paymentInfo.transaction_amount}</p>
                <p><strong>Método de pago:</strong> {paymentInfo.payment_method_id}</p>
              </div>
            ) : (
              <p>No se pudo obtener la información del pago.</p>
            )}
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;