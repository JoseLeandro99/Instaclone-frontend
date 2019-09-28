import axios from 'axios';

const localArea = 'http://localhost:3333';

const api = axios.create({ baseURL: localArea });

export default api;