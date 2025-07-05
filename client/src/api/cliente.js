import axios from "./axios";

export const getNameRequest = async (cliente_rut) => axios.get(`/cliente/getclientname/${cliente_rut}`);

export const getClienteByRutRequest = async (cliente_rut) => axios.get(`/cliente/getclientbyrut/${cliente_rut}`);

export const createClienteRequest = async (cliente) => axios.post("/cliente/createcliente", cliente);