import {createContext, useContext, useState} from "react";
import {createTallerRequest, deleteTallerRequest, getTallerRequest, getWorkshopsRequest} from "../api/workshops";

const WorkshopContext = createContext();

export const useWorkshop = () => {
  const context = useContext(WorkshopContext);
  if (!context) throw new Error("useWorkshop must be used within a WorkshopProvider");
  return context;
};

export function WorkshopProvider({children}) {

  const [workshops, setWorkshops] = useState([]);

  const cargarTalleres = async () => {
    const res = await getWorkshopsRequest();
    setWorkshops(res.data);
  };

  const getTaller = async (id) => {
    try {
      const res = await getTallerRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  }

  const createTaller = async (taller) => {
    try {
      const res = await createTallerRequest(taller);

      setWorkshops(prevWorkshops => [...prevWorkshops, res.data]);
      return res.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          return {
            status: error.response.status,
            message: error.response.data.message
          };
        } else {
          return {
            status: error.response.status,
            message: error.response.data.message || "Error al crear el taller"
          };
        }
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor");
        return {
          status: 500,
          message: "No se recibió respuesta del servidor"
        };
      } else {
        console.error("Error al crear la petición:", error.message);
        return {
          status: 500,
          message: error.message
        };
      }
    }
  }

  const deleteTaller = async (tallerId) => {
    try {
      const res = await deleteTallerRequest({taller_id: tallerId});
      setWorkshops(prevWorkshops => prevWorkshops.filter(taller => taller.taller_id !== tallerId));
      return res.data;
    } catch (error) {
      console.error("Error al eliminar el taller:", error);
      throw error;
    }
  }

  return (
    <WorkshopContext.Provider
      value={{
        workshops,
        cargarTalleres,
        getTaller,
        createTaller,
        deleteTaller,
      }}
    >
      {children}
    </WorkshopContext.Provider>
  )
}

export default WorkshopContext;