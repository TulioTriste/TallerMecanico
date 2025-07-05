import axios from './axios.js';

export const updateProfileUserRequest = async (user) => axios.put('/user/update', user);