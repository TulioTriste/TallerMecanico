import axios from "./axios";

export const getWorkshopsRequest = async () => axios.get("/workshops")

export const getTallerRequest = async (taller_id) => axios.get(`/workshop/dashboard/${taller_id}`)

export const createTallerRequest = async (data) => axios.post("/taller/add", data);

export const deleteTallerRequest = async (data) => axios.post("/taller/delete", data);