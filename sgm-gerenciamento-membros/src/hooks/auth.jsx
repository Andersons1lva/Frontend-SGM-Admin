// import { createContext, useContext, useState, useEffect } from "react";
// import { api } from '../services/api';
// import { jwtDecode } from 'jwt-decode'

// export const AuthContext = createContext({});

// function AuthProvider({ children }) {
//     const [data, setData] = useState({});

//     async function signIn({ email, password }) {

//         try {
//             const response = await api.post("/sessions", { email, password })
//             console.log(response)
//             const { user, token } = response.data;

//             localStorage.setItem("@sgm:user", JSON.stringify(user));
//             localStorage.setItem("@sgm:token", token);

//             api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//             setData({ user, token })

//         } catch (error) {
//             let errorMessage

//             if (error.response && error.response.data && error.response.data.message) {
//                 errorMessage = error.response.data.message;
//             }

//             throw new Error(errorMessage);
//         }

//     }

//     function signOut() {
//         localStorage.removeItem("@sgm:token");
//         localStorage.removeItem("@sgm:user");

//         setData({});
//     }


//     useEffect(() => {
//         const token = localStorage.getItem("@sgm:token");
//         const user = localStorage.getItem("@sgm:user");

//         if (token && user) {
//             api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

//             setData({
//                 token,
//                 user: JSON.parse(user)
//             });
//         }

//     }, [])

//     useEffect(() => {
//         const token = localStorage.getItem('@sgm:token');
//         if (token) {
//             const decodedToken = jwtDecode(token);
//             if (Date.now() >= decodedToken.exp * 1000) {
//                 localStorage.removeItem('@sgm:token');
//                 setData({});
//             }
//         }
//     }, []);

//     return (
//         <AuthContext.Provider value={{
//             signIn,
//             user: data.user,
//             signOut
//         }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// function useAuth() {
//     const context = useContext(AuthContext);

//     return context;
// }

// export { AuthProvider, useAuth };

import { createContext, useContext, useState, useEffect } from "react";
import { api } from '../services/api';
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [data, setData] = useState({});

    async function signIn({ email, password }) {
        try {
            const response = await api.post("/sessions", { email, password })
            const { user, token } = response.data;

            localStorage.setItem("@sgm:user", JSON.stringify(user));
            localStorage.setItem("@sgm:token", token);

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setData({ user, token })

        } catch (error) {
            let errorMessage = error.response?.data?.message || "Erro de autenticação";
            throw new Error(errorMessage);
        }
    }

    function signOut() {
        localStorage.removeItem("@sgm:token");
        localStorage.removeItem("@sgm:user");
        setData({});
    }

    // Adiciona um novo interceptor para verificar token em todas as requisições
    useEffect(() => {
        const interceptor = api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("@sgm:token");
                if (token) {
                    const decodedToken = jwtDecode(token);
                    if (Date.now() >= decodedToken.exp * 1000) {
                        signOut();
                        window.location.href = '/login'; // Redireciona para login
                        return Promise.reject(new Error('Token expirado'));
                    }
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Limpeza do interceptor
        return () => api.interceptors.request.eject(interceptor);
    }, []);

    // Manter o useEffect de inicialização
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
    }, [])

    return (
        <AuthContext.Provider value={{
            signIn,
            user: data.user,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };