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