import axios from 'axios';

// Create a base Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true, // Include cookies for authentication
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;