import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001/api' });

export const signup = (formData) => API.post('/auth/signup', formData);
export const login = (formData) => API.post('/auth/login', formData);
// export const logValue = (logData) => API.post('/logs', logData);
// export const fetchLogs = (email) => API.get(`/logs`, { params: { email } });
