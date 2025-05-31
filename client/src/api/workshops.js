import axios from "./axios";

export const getWorkshopsRequest = async () => axios.get("/workshops")

export const getTallerRequest = async (id) => axios.get(`/workshop/dashboard/${id}`)