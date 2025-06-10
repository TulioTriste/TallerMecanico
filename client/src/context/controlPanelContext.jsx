import { createContext, useContext, useState, useEffect } from "react";
import { getCitasHoyRequest, getCountCitasProx7DiasRequest, getCountOTMesRequest, getCountRegisteredVehiclesRequest, 
        getIngresosDelMesRequest, 
        getNextCitaRequest, getOrdenesDeTrabajoCountByEstadoRequest, getOrdenesDeTrabajoCountRequest, 
        getRecentOTsRequest, 
        getRolesRequest} from "../api/controlpanel";
import { useLocation } from "react-router-dom";

const ControlPanelContext = createContext();

export const useControlPanel = () => {
  const context = useContext(ControlPanelContext);
  if (!context) throw new Error("useControlPanel must be used within a ControlPanelProvider");
  return context;
};

export function ControlPanelProvider({ children }) {
  const [registeredVehicles, setRegisteredVehicles] = useState(false);
  const [roles, setRoles] = useState([]);
  const location = useLocation();


  const updateRegisteredVehicles = async () => {
    try {
      const res = await getCountRegisteredVehiclesRequest();
      setRegisteredVehicles(res.data.count);
    } catch (error) {
      console.error("Error al obtener el conteo de vehículos registrados:", error);
      setRegisteredVehicles(false); // En caso de error, se puede establecer a false o a un valor predeterminado
    }
  };

  const updateRoles = async () => {
    try {
      const res = await getRolesRequest();
      setRoles(res.data);
    } catch (error) {
      console.error("Error al obtener los roles:", error);
      setRoles([]); // En caso de error, se puede establecer a un array vacío
    }
  };

  // Puesto para que se actualize solo cada 10 segundos
  useEffect(() => {
    const routesNeedingUpdates = ['/dashboard', '/workshop/dashboard'];
    const shouldUpdate = routesNeedingUpdates.some(route =>
        location.pathname === route || location.pathname.startsWith(route)
    );

    if (shouldUpdate) {
      updateRegisteredVehicles();
      updateRoles();

      const interval = setInterval(updateRegisteredVehicles, 10000); // Dentro del setInterval, se actualiza cada 10 segundos
      return () => clearInterval(interval);
    }
  }, [location.pathname]);

  const getNextCitaTaller = async (id) => {
    try {
      const res = await getNextCitaRequest(id);
      if (!res.data || !res.data.nextCita) {
        return false;
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
      return 0;
    }
  }

  const getOrdenesDeTrabajoCountByEstado = async (taller_id, estado_id) => {
    try {
      const res = await getOrdenesDeTrabajoCountByEstadoRequest(taller_id, estado_id);
      return res.data.count;
    } catch (error) {
      console.error("Error al obtener el conteo de órdenes de trabajo por estado:", error);
      return 0;
    }
  }

  const getCountCitasProx7Dias = async (taller_id) => {
    try {
      const res = await getCountCitasProx7DiasRequest(taller_id);
      return res.data.count;
    } catch (error) {
      console.error("Error al obtener el conteo de citas próximas a 7 días:", error);
      return 0;
    }
  }

  const getCountOTMes = async (taller_id) => {
    try {
      const res = await getCountOTMesRequest(taller_id);
      return res.data.count;
    } catch (error) {
      console.error("Error al obtener el conteo de órdenes de trabajo del mes:", error);
      return 0;
    }
  }

  const getOtsRecientes = async (taller_id, days) => {
    try {
      const res = await getRecentOTsRequest(taller_id, days);
      return res.data;
    }
    catch (error) {
      console.error("Error al obtener las órdenes de trabajo recientes:", error);
      return [];
    }
  }

  const getCitasHoy = async (taller_id) => {
    try {
      const res = await getCitasHoyRequest(taller_id);
      return res.data;
    } catch (error) {
      console.error("Error al obtener las citas de hoy:", error);
      return [];
    }
  }

  const getIngresosDelMes = async (taller_id) => {
    try {
      const res = await getIngresosDelMesRequest(taller_id);
      return res.data.ingresos;
    } catch (error) {
      console.error("Error al obtener los ingresos del mes:", error);
      return 0;
    }
  }

  return (
    <ControlPanelContext.Provider
      value={{
        registeredVehicles,
        roles,
        updateRegisteredVehicles,
        getNextCitaTaller,
        getOrdenesDeTrabajoCount,
        getOrdenesDeTrabajoCountByEstado,
        getCountCitasProx7Dias,
        getCountOTMes,
        getOtsRecientes,
        getIngresosDelMes,
        getCitasHoy
      }}
    >
      {children}
    </ControlPanelContext.Provider>
  );
}

export default ControlPanelContext;