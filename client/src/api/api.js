import API_ENTRY_POINT from './API_ENTRY_POINT';
import axios from 'axios';

const api = axios.create({
  baseURL: API_ENTRY_POINT,
});

export default api;
