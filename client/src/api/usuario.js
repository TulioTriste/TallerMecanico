import axios from './axios.js';

export const updateProfileUserRequest = async (user) => axios.put('/user/update', user);

export const getCurrentPasswordCorrectRequest = async (data) => axios.post('/user/correctpassword', data);

export const updatePasswordRequest = async (user) => axios.post('/user/updatepassword', user);