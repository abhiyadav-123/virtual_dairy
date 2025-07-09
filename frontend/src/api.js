import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/admin`, // Uses .env value + path
  withCredentials: true, // Required for session/cookie-based auth
});

export default api;
