import { createContext, useContext, useState, useEffect } from "react";
import { getCountCitasProx7DiasRequest, getCountRegisteredVehiclesRequest, getNextCitaRequest, getOrdenesDeTrabajoCountByEstadoRequest, getOrdenesDeTrabajoCountRequest, getRecentOTsRequest } from "../api/controlpanel";

const ControlPanelContext = createContext();

export const useControlPanel = () => {
  const context = useContext(ControlPanelContext);
  if (!context) throw new Error("useControlPanel must be used within a ControlPanelProvider");
  return context;
};

export function ControlPanelProvider({ children }) {
  const [registeredVehicles, setRegisteredVehicles] = useState(false);

  const updateRegisteredVehicles = async () => {
    try {
      const res = await getCountRegisteredVehiclesRequest();
      setRegisteredVehicles(res.data.count);
    } catch (error) {
      console.error("Error al obtener el conteo de vehículos registrados:", error);
      setRegisteredVehicles(false); // En caso de error, se puede establecer a false o a un valor predeterminado
    }
  };

  // Puesto para que se actualize solo cada 10 segundos
  useEffect(() => {
    updateRegisteredVehicles();
    const interval = setInterval(updateRegisteredVehicles, 10000);
    return () => clearInterval(interval);
  }, []);

  const getNextCitaTaller = async (id) => {
    try {
      const res = await getNextCitaRequest(id);
      if (!res.data || !res.data.nextCita) {
        return false; // En caso de no encontrar la cita, retornar false o un valor predeterminado
      }
      return res.data.nextCita;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false;
      }
      return false;
    }
  }

  const getOrdenesDeTrabajoCount = async (taller_id) => {
    try {
      const res = await getOrdenesDeTrabajoCountRequest(taller_id);
      return res.data.count;
    } catch (error) {
      console.error("Error al obtener el conteo de órdenes de trabajo:", error);
      return 0; // En caso de error, retornar 0 o un valor predeterminado
    }
  }

  const getOrdenesDeTrabajoCountByEstado = async (taller_id, estado_id) => {
    try {
      const res = await getOrdenesDeTrabajoCountByEstadoRequest(taller_id, estado_id);
      return res.data.count;
    } catch (error) {
      console.error("Error al obtener el conteo de órdenes de trabajo por estado:", error);
      return 0; // En caso de error, retornar 0 o un valor predeterminado
    }
  }

  const getCountCitasProx7Dias = async (taller_id) => {
    try {
      const res = await getCountCitasProx7DiasRequest(taller_id);
      return res.data.count;
    } catch (error) {
      console.error("Error al obtener el conteo de citas próximas a 7 días:", error);
      return 0; // En caso de error, retornar 0 o un valor predeterminado
    }
  }

  const getOtsRecientes = async (taller_id, days) => {
    try {
      const res = await getRecentOTsRequest(taller_id, days);
      console.log("Órdenes de trabajo recientes:", res.data);
      return res.data;
    }
    catch (error) {
      console.error("Error al obtener las órdenes de trabajo recientes:", error);
      return []; // En caso de error, retornar un array vacío o un valor predeterminado
    }
  }

  return (
    <ControlPanelContext.Provider
      value={{
        registeredVehicles,
        updateRegisteredVehicles,
        getNextCitaTaller,
        getOrdenesDeTrabajoCount,
        getOrdenesDeTrabajoCountByEstado,
        getCountCitasProx7Dias,
        getOtsRecientes
      }}
    >
      {children}
    </ControlPanelContext.Provider>
  );
}

export default ControlPanelContext;