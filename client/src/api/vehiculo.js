import axios from "./axios";

export const getVehiculoNameRequest = async (patente) => axios.get(`/veh/getvehiculoname/${patente}`);

export const getVehiculoByPatenteRequest = async (patente) => axios.get(`/veh/getvehiculo/${patente}`);