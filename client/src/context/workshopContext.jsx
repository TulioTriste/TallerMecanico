import { createContext, useContext, useState } from "react";
import { getTallerRequest, getWorkshopsRequest } from "../api/workshops";

const WorkshopContext = createContext();

export const useWorkshop = () => {
  const context = useContext(WorkshopContext);
  if (!context) throw new Error("useWorkshop must be used within a WorkshopProvider");
  return context;
};

export function WorkshopProvider({ children }) {

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

    return (
    <WorkshopContext.Provider
      value={{
        workshops,
        cargarTalleres,
        getTaller,
      }}
    >
      {children}
    </WorkshopContext.Provider>
)};

export default WorkshopContext;