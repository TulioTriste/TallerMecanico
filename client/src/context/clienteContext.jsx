import {createContext, useContext} from "react";
import {getNameRequest} from "../api/cliente";

const ClienteContext = createContext();

export const useCliente = () => {
  const context = useContext(ClienteContext);
  if (!context) throw new Error("useCliente must be used within a ClienteProvider");
  return context;
};

export function ClienteProvider({children}) {

  const getClienteName = async (cliente_rut) => {
    try {
      const response = await getNameRequest(cliente_rut);
      return response.data.userName;
    } catch (error) {
      console.error("Error al obtener el nombre del cliente:", error);
      return null; // Retornar null o un valor predeterminado en caso de error
    }
  };

  return (
    <ClienteContext.Provider
      value={{
        getClienteName
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
}

export default ClienteContext;