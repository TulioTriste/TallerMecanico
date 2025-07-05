import axios from "./axios";

export const getVehiculoNameRequest = async (patente) => axios.get(`/veh/getvehiculoname/${patente}`);

export const getVehiculoByPatenteRequest = async (patente) => axios.get(`/veh/getvehiculo/${patente}`);

export const createVehiculoRequest = async (vehiculo) => axios.post("/veh/createvehiculo", vehiculo);