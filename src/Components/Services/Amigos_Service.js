import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./Api_Service";
import axios from "axios";

const AmigosContext = createContext();

export const AmigosProvider = ({ children }) => {
    const { getCredentials } = useAuth();

    const apiUrl = process.env.REACT_APP_API_URL;
    const tentativasMaximasRequests = 5;
    var credenciaisAmigos = null;
    const [userNameAmigos, setUserNameAmigos] = useState(null);

    async function refreshCredenciaisAmigos() {
        for (var tentativaCred = 0; tentativaCred < tentativasMaximasRequests; tentativaCred++) {
            if (!credenciaisAmigos) {
                const cred = await getCredentials();
                credenciaisAmigos = cred;
            }
            break;
        }
    }

    async function getListaAmigos() {
        for (var tentativaCred = 0; tentativaCred < tentativasMaximasRequests; tentativaCred++) {
            if (!credenciaisAmigos) {
                await refreshCredenciaisAmigos();
                continue;
            }
            break;
        }

        const userEmail = sessionStorage.getItem('userEmail');

        for (var tentativa = 0; tentativa < tentativasMaximasRequests; tentativa++) {
            const responseListaAmigos = await axios.post(`${apiUrl}/user/amigos`, {
                email: userEmail
            });

            if (!responseListaAmigos) {
                continue;
            }
            if (responseListaAmigos.status < 200 || responseListaAmigos.status > 299) {
                continue;
            }

            return responseListaAmigos.data;
        }
    }

    async function getAllUsersExceptLoggedUserAndFriends() {
        for (var tentativaCred = 0; tentativaCred < tentativasMaximasRequests; tentativaCred++) {
            if (!credenciaisAmigos) {
                await refreshCredenciaisAmigos();
                continue;
            }
            break;
        }

        for (var tentativa = 0; tentativa < tentativasMaximasRequests; tentativa++) {
            const responseListaUsuarios = await axios.get(`${apiUrl}/user/lista-usuarios`);
            if (!responseListaUsuarios) {
                continue;
            }
            if (responseListaUsuarios.status < 200 || responseListaUsuarios.status > 299) {
                continue;
            }

            const userEmail = sessionStorage.getItem('userEmail');

            const listaUsuariosFiltradaLoggedUser = responseListaUsuarios.data.filter(
                (user) => user.email !== userEmail
            );

            const listaAmigos = await getListaAmigos();

            const listaUsuariosFiltradaAmigosELoggedUser = listaUsuariosFiltradaLoggedUser.filter(
                (user) =>
                    !listaAmigos.some((amigo) => amigo.email === user.email)
            );

            return listaUsuariosFiltradaAmigosELoggedUser;
        }
    }

    async function getNotificacoesUsuario() {
        for (var tentativaCred = 0; tentativaCred < tentativasMaximasRequests; tentativaCred++) {
            if (!credenciaisAmigos) {
                await refreshCredenciaisAmigos();
                continue;
            }
            break;
        }

        const userEmail = sessionStorage.getItem('userEmail');

        for (var tentativa = 0; tentativa < tentativasMaximasRequests; tentativa++) {
            const responseListaNotificacoes = await axios.post(`${apiUrl}/user/lista-notificacoes`, {
                email: userEmail
            });

            if (!responseListaNotificacoes) {
                continue;
            }
            if (responseListaNotificacoes.status < 200 || responseListaNotificacoes.status > 299) {
                continue
            }

            return responseListaNotificacoes.data;
        }
    }

    useEffect(() => {
        if (!credenciaisAmigos) {
          refreshCredenciaisAmigos();
        }
      }, [credenciaisAmigos]);

    return <AmigosContext.Provider value={{ getListaAmigos, getAllUsersExceptLoggedUserAndFriends, getNotificacoesUsuario, refreshCredenciaisAmigos }}>{children}</AmigosContext.Provider>;
};

export const useAmigos = () => {
    return useContext(AmigosContext);
};
