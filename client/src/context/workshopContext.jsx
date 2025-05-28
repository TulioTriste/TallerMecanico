import { createContext, useContext, useState } from "react";
import { getWorkshopRequest } from "../api/workshops";

const WorkshopContext = createContext();

export const useWorkshop = () => {
  const context = useContext(WorkshopContext);
  if (!context) throw new Error("useWorkshop must be used within a WorkshopProvider");
  return context;
};

export function WorkshopProvider({ children }) {

    const [workshops, setWorkshops] = useState([]);

    const cargarTalleres = async () => {
      const res = await getWorkshopRequest();
      console.log("Talleres obtenidos:", res.data);
      setWorkshops(res.data);
    };

    return (
    <WorkshopContext.Provider
      value={{
        workshops,
        cargarTalleres,
      }}
    >
      {children}
    </WorkshopContext.Provider>
)};

export default WorkshopContext;