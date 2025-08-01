import {createContext, useContext} from "react";
import {createVehiculoRequest, getVehiculoByPatenteRequest, getVehiculoNameRequest} from "../api/vehiculo";

const VehiculoContext = createContext();

export const useVehiculo = () => {
  const context = useContext(VehiculoContext);
  if (!context) throw new Error("useVehiculo must be used within a VehiculoProvider");
  return context;
};

export function VehiculoProvider({children}) {

  const getVehiculoName = async (patente) => {
    try {
      const response = await getVehiculoNameRequest(patente);
      return response.data.vehiculoName;
    } catch (error) {
      console.error("Error al obtener el nombre del vehículo:", error);
      return null;
    }
  };

  const getVehiculoByPatente = async (patente) => {
    try {
      const response = await getVehiculoByPatenteRequest(patente);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el vehículo por patente:", error);
      return null;
    }
  }

  const createVehiculo = async (vehiculo) => {
    try {
      const response = await createVehiculoRequest(vehiculo);
      return response.data;
    } catch (error) {
      console.error("Error al crear el vehículo:", error);
      return null;
    }
  }

  return (
    <VehiculoContext.Provider
      value={{
        getVehiculoName,
        getVehiculoByPatente,
        createVehiculo,
      }}
    >
      {children}
    </VehiculoContext.Provider>
  );
}

export default VehiculoContext;