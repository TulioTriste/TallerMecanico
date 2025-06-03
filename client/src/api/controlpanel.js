import axios from "./axios";

export const getCountRegisteredVehiclesRequest = async () => axios.get("/cp/registeredvehicles");