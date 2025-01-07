import axios from "axios";

const baseURL = import.meta.env.DEV 
    ? '/api'  // Desenvolvimento: usa o proxy do Vite
    : import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL
});