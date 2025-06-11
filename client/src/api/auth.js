import axios from "./axios";

export const registerRequest = async (user) =>
  axios.post(`/auth/register`, user);

export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);

export const isValidEmailRequest = async (data) => axios.post(`/auth/valid-email`, data)

export const sendResetPasswordRequest = async (data) => axios.post(`/auth/request-reset-password`, data);

export const getRutByCorreoRequest = async (data) => axios.post(`/auth/getrut-bycorreo`, data);

export const resetPasswordRequest = async (data) => axios.post(`/auth/reset-password`, data);