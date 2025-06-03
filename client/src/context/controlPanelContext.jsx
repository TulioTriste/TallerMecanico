import { createContext, useContext, useState, useEffect } from "react";
import { getCountRegisteredVehiclesRequest } from "../api/controlpanel";

const ControlPanelContext = createContext();

export const useControlPanel = () => {
  const context = useContext(ControlPanelContext);
  if (!context) throw new Error("useControlPanel must be used within a ControlPanelProvider");
  return context;
};

export function ControlPanelProvider({ children }) {
  const [registeredVehicles, setRegisteredVehicles] = useState(false);

  const updateRegisteredVehicles = async () => {
    const res = await getCountRegisteredVehiclesRequest();
    setRegisteredVehicles(res.data.count);
    console.log("Total de vehículos registrados:", res.data);
  };

  // Puesto para que se actualize solo cada 10 segundos
  useEffect(() => {
    updateRegisteredVehicles();
    const interval = setInterval(updateRegisteredVehicles, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ControlPanelContext.Provider
      value={{
        registeredVehicles,
        updateRegisteredVehicles,
      }}
    >
      {children}
    </ControlPanelContext.Provider>
  );
}

export default ControlPanelContext;