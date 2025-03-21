import axios from "axios";

// Configuração global do Axios com Interceptor para adicionar o token
axios.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("@sgm:token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const BASE_URL = import.meta.env.VITE_API_URL;
const EVENTO_URL = `${BASE_URL}/api/auth/eventos`;

export const CalendarioService =  {

    getAllEventos: async () => {
        try {
            const response = await axios.get(EVENTO_URL);
            return response.data;
        } catch (error) {
            console.error("Erro ao carregar eventos:", error);
            return [];
        }
    },

    getEventosDoMes: async () =>{
        try {
            const response = await axios.get(`${EVENTO_URL}/mes_atual`)
            return response.data
        } catch (error) {
            console.error('Erro ao buscar eventos do mês:', error);
            return [];
        }
    },
    
    criarEventos: async (eventoData) => {
        try{
            const eventoPayload = {
                titulo: eventoData.title,
                inicio: eventoData.start,
                fim: eventoData.end,
                dia_todo: eventoData.allDay ?? true,
            };
            const response = await axios.post(EVENTO_URL, eventoPayload);
            return response.data;
        }catch(error){
            console.error("Erro ao criar evento:", error);
            throw error;
        }
    },

    deleteEventos: async (eventoId) => {
        try {
            await axios.delete(`${EVENTO_URL}/${eventoId}`);
        } catch (error) {
            console.error("Erro ao deletar evento:", error);
        }
    }
};

export default CalendarioService;