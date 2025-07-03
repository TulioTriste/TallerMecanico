import {createContext, useContext} from "react";
import {createClienteRequest, getClienteByRutRequest, getNameRequest} from "../api/cliente";

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
      return null;
    }
  };

  const getClienteByRut = async (cliente_rut) => {
    try {
      const response = await getClienteByRutRequest(cliente_rut);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el cliente por RUT:", error);
      return null;
    }
  };

  const createCliente = async (cliente) => {
    try {
      const response = await createClienteRequest(cliente);
      return response.data;
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      return null;
    }
  }

  return (
    <ClienteContext.Provider
      value={{
        getClienteName,
        getClienteByRut,
        createCliente
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
}

export default ClienteContext;