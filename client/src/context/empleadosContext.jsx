import { createContext, useContext } from "react";
import { insertEmpleadoRequest } from "../api/empleado";

const EmpleadoContext = createContext();

export const useEmpleado = () => {
  const context = useContext(EmpleadoContext);
  if (!context) throw new Error("useEmpleado must be used within a EmpleadoProvider");
  return context;
};

export function EmpleadoProvider({ children }) {

  const addEmpleado = async (data) => {
    try {
      const response = await insertEmpleadoRequest(data);
      return response.status === 201; // Retorna true si la inserción fue exitosa
    } catch (error) {
      console.error("Error al agregar el empleado:", error);
      throw error; // Propagar el error para manejarlo en el componente que llama
    }
  };

  return (
    <EmpleadoContext.Provider
      value={{
        addEmpleado
      }}
    >
      {children}
    </EmpleadoContext.Provider>
  );
}

export default EmpleadoContext;