import axios from "./axios";

export const getCountRegisteredVehiclesRequest = async () => axios.get("/cp/registeredvehicles");

export const getNextCitaRequest = async (taller_id) => axios.get(`/cp/nextcita/${taller_id}`);

export const getOrdenesDeTrabajoCountRequest = async (taller_id) => axios.get(`/cp/ordenestrabajocount/${taller_id}`);

export const getOrdenesDeTrabajoCountByEstadoRequest = async (taller_id, estado_id) =>
  axios.get(`/cp/ordenestrabajocountestado/${taller_id}/${estado_id}`);

export const getCountCitasProx7DiasRequest = async (taller_id) => axios.get(`/cp/citasprox7dias/${taller_id}`);

export const getCountOTMesRequest = async (taller_id) => axios.get(`/cp/otdelmes/${taller_id}`);

export const getRecentOTsRequest = async (taller_id, days) =>
  axios.get(`/cp/otsrecientes/${taller_id}/${days}`);

export const getCitasHoyRequest = async (taller_id) => axios.get(`/cp/citashoy/${taller_id}`);

export const getIngresosDelMesRequest = async (taller_id) => axios.get(`/cp/ingresosdelmes/${taller_id}`);

export const getRolesRequest = async () => axios.get("/cp/getroles");

export const getOtRequest = async (taller_id, ot_id) => axios.get(`/cp/getot/${taller_id}/${ot_id}`);

export const addTaskRequest = async (taller_id, ot_id, task) => axios.post(`/cp/addtasktoot/${taller_id}/${ot_id}`, task);

export const getTasksRequest = async (taller_id, ot_id) => axios.get(`/cp/gettasksbyotid/${taller_id}/${ot_id}`);

export const updateOrCreateTasksRequest = async (taller_id, ot_id, tasks) => axios.post(`/cp/updorcretasks/${taller_id}/${ot_id}`, tasks);

export const uploadImagesRequest = async (formData) => axios.post(`/cp/uploadimage`, formData);

export const getEstadosRequest = async () => axios.get("/cp/getestados");

export const updateOtRequest = async (taller_id, ot_id, orden) => axios.post(`/cp/updateot/${taller_id}/${ot_id}`, orden);