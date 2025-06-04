import axios from "./axios";

export const getWorkshopsRequest = async () => axios.get("/workshops")

export const getTallerRequest = async (taller_id) => axios.get(`/workshop/dashboard/${taller_id}`)