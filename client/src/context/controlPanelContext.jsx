import {createContext, useContext, useEffect, useState} from "react";
import {
  addCitaRequest,
  addOtRequest,
  addTaskRequest, getCitasByTallerRequest,
  getCitasHoyRequest, getCitasHoyTotalRequest, getClientesCountRequest,
  getCountCitasProx7DiasRequest, getCountOrdenesActivasRequest,
  getCountOTMesRequest,
  getCountRegisteredVehiclesRequest, getEstadosRequest,
  getIngresosDelMesRequest,
  getNextCitaRequest,
  getOrdenesDeTrabajoCountByEstadoRequest,
  getOrdenesDeTrabajoCountRequest, getOtByUniqueIdRequest, getOtRequest,
  getRecentOTsRequest,
  getRolesRequest, getTasksRequest, updateOrCreateTasksRequest, updateOtRequest, uploadImagesRequest
} from "../api/controlpanel";
import {useLocation} from "react-router-dom";

const ControlPanelContext = createContext();

export const useControlPanel = () => {
  const context = useContext(ControlPanelContext);
  if (!context) throw new Error("useControlPanel must be used within a ControlPanelProvider");
  return context;
};

export function ControlPanelProvider({children}) {
  const [registeredVehicles, setRegisteredVehicles] = useState(false);
  const [clientesCount, setClientesCount] = useState(false);
  const [ordenesActivas, setOrdenesActivas] = useState(false);
  const [citasTotalHoy, setCitasTotalHoy] = useState(false);
  const [roles, setRoles] = useState([]);
  const [estados, setEstados] = useState([]);
  const location = useLocation();

  const fetchEstados = async () => {
    try {
      const response = await getEstadosRequest();
      if (response.data && Array.isArray(response.data)) {
        setEstados(response.data);
      } else {
        console.error("Formato de datos inesperado para estados:", response.data);
        setEstados([]);
      }
    } catch (error) {
      console.error("Error al obtener los estados:", error);
      setEstados([]); // En caso de error, se puede establecer a un array vacío
    }
  }

  useEffect(() => {
    fetchEstados();
  }, []);

  const updateCounts = async () => {
    try {
      const regVehRes = await getCountRegisteredVehiclesRequest();
      setRegisteredVehicles(regVehRes.data.count);

      const cliRes = await getClientesCountRequest();
      setClientesCount(cliRes.data.count);

      const ordActRes = await getCountOrdenesActivasRequest();
      setOrdenesActivas(ordActRes.data.count);

      const citasHoyRes = await getCitasHoyTotalRequest();
      setCitasTotalHoy(citasHoyRes.data.count);
    } catch (error) {
      console.error("Error al obtener el conteo:", error);
      setRegisteredVehicles(false); // En caso de error, se puede establecer a false o a un valor predeterminado
    }
  };

  const updateRoles = async () => {
    try {
      const res = await getRolesRequest();
      setRoles(res.data);
    } catch (error) {
      console.error("Error al obtener los roles:", error);
      setRoles([]); // En caso de error, se puede establecer a un array vacío
    }
  };

  // Puesto para que se actualize solo cada 10 segundos
  useEffect(() => {
    const routesNeedingUpdates = ['/', '/workshop/dashboard', '/workshop/sucursal'];
    const shouldUpdate = routesNeedingUpdates.some(route =>
      location.pathname === route || location.pathname.startsWith(route)
    );

    if (shouldUpdate) {
      updateCounts();
      updateRoles();

      const interval = setInterval(updateCounts, 10000); // Dentro del setInterval, se actualiza cada 10 segundos
      return () => clearInterval(interval);
    }
  }, [location.pathname]);

  const getNextCitaTaller = async (id) => {
    try {
      const res = await getNextCitaRequest(id);
      if (!res.data || !res.data.nextCita) {
        return false;
      }
      return res.data.nextCita;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false;
      }
      return false;
    }
  }

  const getOrdenesDeTrabajoCount = async (taller_id) => {
    try {
      const res = await getOrdenesDeTrabajoCountRequest(taller_id);
      return res.data.count;
    } catch (error) {
      console.error("Error al obtener el conteo de órdenes de trabajo:", error);
      return 0;
    }
  }

  const getOrdenesDeTrabajoCountByEstado = async (taller_id, estado_id) => {
    try {
      const res = await getOrdenesDeTrabajoCountByEstadoRequest(taller_id, estado_id);
      return res.data.count;
    } catch (error) {
      console.error("Error al obtener el conteo de órdenes de trabajo por estado:", error);
      return 0;
    }
  }

  const getCountCitasProx7Dias = async (taller_id) => {
    try {
      const res = await getCountCitasProx7DiasRequest(taller_id);
      return res.data.count;
    } catch (error) {
      console.error("Error al obtener el conteo de citas próximas a 7 días:", error);
      return 0;
    }
  }

  const getCountOTMes = async (taller_id) => {
    try {
      const res = await getCountOTMesRequest(taller_id);
      return res.data.count;
    } catch (error) {
      console.error("Error al obtener el conteo de órdenes de trabajo del mes:", error);
      return 0;
    }
  }

  const getOtsRecientes = async (taller_id, days) => {
    try {
      const res = await getRecentOTsRequest(taller_id, days);
      return res.data;
    } catch (error) {
      console.error("Error al obtener las órdenes de trabajo recientes:", error);
      return [];
    }
  }

  const getCitasHoy = async (taller_id) => {
    try {
      const res = await getCitasHoyRequest(taller_id);
      return res.data;
    } catch (error) {
      console.error("Error al obtener las citas de hoy:", error);
      return [];
    }
  }

  const getIngresosDelMes = async (taller_id) => {
    try {
      const res = await getIngresosDelMesRequest(taller_id);
      return res.data.ingresos;
    } catch (error) {
      console.error("Error al obtener los ingresos del mes:", error);
      return 0;
    }
  }

  const getOt = async (taller_id, ot_id) => {
    try {
      const res = await getOtRequest(taller_id, ot_id);

      return res.data;
    } catch (error) {
      console.error("Error al obtener la orden de trabajo:", error);
      return null;
    }
  }

  const getTasks = async (taller_id, ot_id) => {
    try {
      const res = await getTasksRequest(taller_id, ot_id);
      return res.data || [];
    } catch (error) {
      console.error("Error al obtener las tareas de la orden de trabajo:", error);
      return [];
    }
  }

  const addTask = async (taller_id, ot_id, task) => {
    try {
      const res = await addTaskRequest(taller_id, ot_id, {"task": task});
      return res.data;
    } catch (error) {
      console.error("Error al agregar tarea a la orden de trabajo:", error);
      return null;
    }
  }

  const updateOrCreateTasks = async (taller_id, ot_id, tasks) => {
    try {
      const res = await updateOrCreateTasksRequest(taller_id, ot_id, tasks);
      return res.data;
    } catch (error) {
      console.error("Error al actualizar o crear tareas:", error);
      return null;
    }
  }

  const uploadImages = async (formData) => {
    try {
      const res = await uploadImagesRequest(formData);
      return res.data;
    } catch (error) {
      console.error("Error al subir imágenes:", error);
      return null;
    }
  }

  const updateOt = async (taller_id, ot_id, orden) => {
    try {
      const response = await updateOtRequest(taller_id, ot_id, orden);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la orden de trabajo:", error);
      return null;
    }
  }

  const addOt = async (taller_id, orden) => {
    try {
      const response = await addOtRequest(taller_id, orden);
      return response.data;
    } catch (error) {
      console.error("Error al agregar la orden de trabajo:", error);
      return null;
    }
  }

  const getOtByUniqueId = async (unique_id) => {
    try {
      const response = await getOtByUniqueIdRequest(unique_id);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la orden de trabajo por ID único:", error);
      return null;
    }
  }

  const addCita = async (taller_id, cita) => {
    try {
      const response = await addCitaRequest(taller_id, cita);
      if (response.status !== 201) {
        console.error("Error al agregar la cita:", response.data.message);
        return null;
      }
      return true;
    } catch (error) {
      console.error("Error al agregar la cita:", error);
      return null;
    }
  }

  const getCitasByTaller = async (taller_id) => {
    try {
      const response = await getCitasByTallerRequest(taller_id);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las citas del taller:", error);
      return [];
    }
  }

  return (
    <ControlPanelContext.Provider
      value={{
        registeredVehicles,
        ordenesActivas,
        clientesCount,
        citasTotalHoy,
        roles,
        estados,
        getNextCitaTaller,
        getOrdenesDeTrabajoCount,
        getOrdenesDeTrabajoCountByEstado,
        getCountCitasProx7Dias,
        getCountOTMes,
        getOtsRecientes,
        getIngresosDelMes,
        getCitasHoy,
        getOt,
        getTasks,
        addTask,
        updateOrCreateTasks,
        uploadImages,
        updateOt,
        addOt,
        getOtByUniqueId,
        updateRoles,
        addCita,
        getCitasByTaller,
      }}
    >
      {children}
    </ControlPanelContext.Provider>
  );
}

export default ControlPanelContext;