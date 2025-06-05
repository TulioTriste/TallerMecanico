import axios from "./axios";

export const getVehiculoNameRequest = async (patente) => axios.get(`/veh/getvehiculoname/${patente}`);