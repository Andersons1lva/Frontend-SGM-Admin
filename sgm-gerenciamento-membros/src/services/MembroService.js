// import axios from 'axios';

// // URL base da API (você pode mudar conforme necessário)
// const API_URL = 'http://localhost:8080/auth/membros';

// const MembroService = {
//   // Buscar todos os membros
//   getAllMembros: async (token) => {
//     try {
//       const response = await axios.get(API_URL, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
//         },
//       });
//       console.log("Response: ", response);
//       return response.data;
//     } catch (error) {
//       console.error('Erro ao buscar membros:', error);
//       throw error;
//     }
//   },

//   // Excluir um membro pelo ID
//   deleteMembro: async (id, token) => {
//     try {
//       await axios.delete(`${'http://localhost:8080/auth'}/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
//         },
//       });
//     } catch (error) {
//       console.error('Erro ao excluir membro:', error);
//       throw error;
//     }
//   },

//   // Adicionar um novo membro (caso tenha essa funcionalidade)
//   addMembro: async (membro, token) => {
//     try {
//       const response = await axios.post(API_URL, membro, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Erro ao adicionar membro:', error);
//       throw error;
//     }
//   },

//   // Editar um membro pelo ID (caso tenha essa funcionalidade)
//   editMembro: async (id, membroAtualizado, token) => {
//     try {
//       const response = await axios.put(`${API_URL}/${id}`, membroAtualizado, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
//         },
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Erro ao editar membro:', error);
//       throw error;
//     }
//   },
// };

// export default MembroService;

import axios from "axios";

// Configuração global do Axios com Interceptor para adicionar o token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@sgm:token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Adiciona o token ao cabeçalho
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const BASE_URL = import.meta.env.VITE_API_URL;
const MEMBROS_URL = `${BASE_URL}/auth/membros`;

const MembroService = {
  // Buscar todos os membros
  getAllMembros: async () => {
    try {
      const response = await axios.get(MEMBROS_URL);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar membros:", error);
      throw error;
    }
  },

  buscarPorId: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/${id}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar membros por id:", error);
      throw error;
    }
  },

  // Excluir um membro pelo ID
  deleteMembro: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/auth/${id}`);
    } catch (error) {
      console.error("Erro ao excluir membro:", error);
      throw error;
    }
  },

  // Adicionar um novo membro
  addMembro: async (membro) => {
    console.log("Novo membro: ", membro);
    try {
      const response = await axios.post(MEMBROS_URL, membro);
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
      throw error;
    }
  },

  // Editar um membro pelo ID
  editMembro: async (id, membro) => {
    try {
      const response = await axios.put(`${MEMBROS_URL}/${id}`, membro, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error("Erro na resposta:", {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      }
      throw error;
    }
  },
  
  aniversarianteDoMes: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/aniversariantes`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar aniversariantes:", error);
      throw error;
    }
  },
};

export default MembroService;
