import axios from "./axios";

export const insertEmpleadoRequest = async (data) => axios.post("/empleados/add", data);

export const getEmpleadosByTallerRequest = async (taller_id) => axios.get(`/empleados/get/${taller_id}`);