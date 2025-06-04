import { createContext, useContext, useState, useEffect } from "react";
import { getCountRegisteredVehiclesRequest, getNextCita } from "../api/controlpanel";

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
      const res = await getNextCita(id);
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

  return (
    <ControlPanelContext.Provider
      value={{
        registeredVehicles,
        updateRegisteredVehicles,
        getNextCitaTaller
      }}
    >
      {children}
    </ControlPanelContext.Provider>
  );
}

export default ControlPanelContext;