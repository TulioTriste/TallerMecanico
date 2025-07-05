import {createContext, useContext} from "react";
import {
  deleteEmpleadoRequest,
  getEmpleadosByTallerRequest,
  insertEmpleadoRequest,
  isEmpleadoExistsRequest
} from "../api/empleado";

const EmpleadoContext = createContext();

export const useEmpleado = () => {
  const context = useContext(EmpleadoContext);
  if (!context) throw new Error("useEmpleado must be used within a EmpleadoProvider");
  return context;
};

export function EmpleadoProvider({children}) {

  const addEmpleado = async (data) => {
    try {
      // Formatea el rut antes de enviarlo a la base de datos
      if (data.empleado_rut) {
        const { default: StringFormatter } = await import("../utilities/stringFormatter.js");
        data.empleado_rut = StringFormatter.formatRut(data.empleado_rut);
      }
      const response = await insertEmpleadoRequest(data);
      return response.status === 200; // Retorna true si la inserción fue exitosa
    } catch (error) {
      console.error("Error al agregar el empleado:", error);
      throw error; // Propagar el error para manejarlo en el componente que llama
    }
  };


  const getEmpleadosByTaller = async (taller_id) => {
    try {
      const res = await getEmpleadosByTallerRequest(taller_id);
      return res.data;
    } catch (error) {
      console.error("Error al obtener los empleados del taller:", error);
      return [];
    }
  };

  const deleteEmpleado = async (data) => {
    try {
      const response = await deleteEmpleadoRequest(data);
      return response.status === 200; // Retorna true si la eliminación fue exitosa
    } catch (error) {
      console.error("Error al eliminar el empleado:", error);
      throw error; // Propagar el error para manejarlo en el componente que llama
    }
  };

  const isEmpleadoExists = async (data) => {
    try {
      const exist = await isEmpleadoExistsRequest(data);
      return exist.data.exists;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Si el backend responde 404, significa que no existe
        return false;
      }
      console.error("Error al verificar si el empleado existe:", error);
      throw error; // Propaga otros errores para que el frontend pueda mostrar un mensaje
    }
  }

  return (
    <EmpleadoContext.Provider
      value={{
        addEmpleado,
        getEmpleadosByTaller,
        deleteEmpleado,
        isEmpleadoExists,
      }}
    >
      {children}
    </EmpleadoContext.Provider>
  );
}

export default EmpleadoContext;