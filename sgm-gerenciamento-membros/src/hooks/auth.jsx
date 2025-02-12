import { createContext, useContext, useState, useEffect } from "react";
import { api } from '../services/api';
import {jwtDecode} from 'jwt-decode'; 

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState({});

    async function signIn({ email, password }) {
        try {
            const response = await api.post("/sessions", { email, password });
            const { user, token } = response.data;

            localStorage.setItem("@sgm:user", JSON.stringify(user));
            localStorage.setItem("@sgm:token", token);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({ user, token });
        } catch (error) {
            let errorMessage = error.response?.data?.message || "Erro de autenticação";
            throw new Error(errorMessage);
        }
    }

    function signOut() {
        localStorage.removeItem("@sgm:token");
        localStorage.removeItem("@sgm:user");
        setData({});
        window.location.href = '/'; // Redireciona após logout
    }

    // Verifica expiração do token em cada requisição
    useEffect(() => {
        const interceptor = api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("@sgm:token");
                if (token) {
                    try {
                        const decodedToken = jwtDecode(token);
                        if (Date.now() >= decodedToken.exp * 1000) {
                            signOut(); // Faz logout se o token estiver expirado
                            return Promise.reject(new Error('Token expirado'));
                        }
                    } catch (error) {
                        console.error('Erro ao decodificar o token:', error);
                        signOut(); // Em caso de erro ao decodificar, faz logout por segurança
                        return Promise.reject(new Error('Token inválido'));
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        return () => api.interceptors.request.eject(interceptor);
    }, []);

    // Inicialização para restaurar sessão
    useEffect(() => {
        const token = localStorage.getItem("@sgm:token");
        const user = localStorage.getItem("@sgm:user");

        if (token && user) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({
                token,
                user: JSON.parse(user)
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{
            signIn,
            user: data.user,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };
