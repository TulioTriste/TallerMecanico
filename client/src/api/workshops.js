import axios from "./axios";

export const getWorkshopRequest = async () => axios.get("/workshops")