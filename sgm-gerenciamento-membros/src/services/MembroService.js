import axios from 'axios';

// URL base da API (você pode mudar conforme necessário)
const API_URL = 'http://localhost:8080/auth/membros';

const MembroService = {
  // Buscar todos os membros
  getAllMembros: async (token) => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar membros:', error);
      throw error;
    }
  },

  // Excluir um membro pelo ID
  deleteMembro: async (id, token) => {
    try {
      await axios.delete(`${'http://localhost:8080/auth'}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
        },
      });
    } catch (error) {
      console.error('Erro ao excluir membro:', error);
      throw error;
    }
  },

  // Adicionar um novo membro (caso tenha essa funcionalidade)
  addMembro: async (membro, token) => {
    try {
      const response = await axios.post(API_URL, membro, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar membro:', error);
      throw error;
    }
  },

  // Editar um membro pelo ID (caso tenha essa funcionalidade)
  editMembro: async (id, membroAtualizado, token) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, membroAtualizado, {
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao editar membro:', error);
      throw error;
    }
  },
};

export default MembroService;
