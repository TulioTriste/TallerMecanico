import axios from "./axios";

export const getCountRegisteredVehiclesRequest = async () => axios.get("/cp/registeredvehicles");

export const getNextCita = async (id) => axios.get(`/cp/nextcita/${id}`);