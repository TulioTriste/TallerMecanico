import axios from "./axios";

export const getCountRegisteredVehiclesRequest = async () => axios.get("/cp/registeredvehicles");

export const getNextCita = async (id) => axios.get(`/cp/nextcita/${id}`);

export const getOrdenesDeTrabajoCount = async (taller_id) => axios.get(`/cp/ordenestrabajocount/${taller_id}`);

export const getOrdenesDeTrabajoCountByEstado = async (taller_id, estado_id) => 
    axios.get(`/cp/ordenestrabajocountestado/${taller_id}/${estado_id}`);

export const getCountCitasProx7Dias = async (taller_id) => axios.get(`/cp/citasprox7dias/${taller_id}`);