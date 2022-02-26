const API_ENTRY_POINT =
  process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : '/api';

export default API_ENTRY_POINT;
