import axios from "./axios";

export const getNameRequest = async (cliente_rut) => axios.get(`/cliente/getclientname/${cliente_rut}`);