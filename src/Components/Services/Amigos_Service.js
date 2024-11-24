import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./Api_Service";
import axios from "axios";

const AmigosContext = createContext();

export const AmigosProvider = ({ children }) => {
    const { getCredentials } = useAuth();

    const apiUrl = process.env.REACT_APP_API_URL;
    const tentativasMaximasRequests = 5;
    var credenciaisAmigos = null;
    
    const [quantidadeAmigos, setQuantidadeAmigos] = useState(0);

    function getQuantidadeAmigos() {
        return quantidadeAmigos;
    }

    function refreshCredenciaisAmigos() {
        credenciaisAmigos = getCredentials();
    }

    async function getListaAmigos() {
        if (!credenciaisAmigos) {
            refreshCredenciaisAmigos();
        }

        const userEmail = credenciaisAmigos.email;

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

            setQuantidadeAmigos(responseListaAmigos.data.length);

            return responseListaAmigos.data;
        }
    }

    async function getAllUsersExceptLoggedUserAndFriends() {
        if (!credenciaisAmigos) {
            refreshCredenciaisAmigos();
        }

        for (var tentativa = 0; tentativa < tentativasMaximasRequests; tentativa++) {
            const responseListaUsuarios = await axios.get(`${apiUrl}/user/lista-usuarios`);
            if (!responseListaUsuarios) {
                continue;
            }
            if (responseListaUsuarios.status < 200 || responseListaUsuarios.status > 299) {
                continue;
            }

            const userEmail = credenciaisAmigos.email;

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
        if (!credenciaisAmigos) {
            refreshCredenciaisAmigos();
        }

        const userEmail = credenciaisAmigos.email;

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
    }, []);

    return <AmigosContext.Provider value={{ getListaAmigos, getQuantidadeAmigos, getAllUsersExceptLoggedUserAndFriends, getNotificacoesUsuario, refreshCredenciaisAmigos }}>{children}</AmigosContext.Provider>;
};

export const useAmigos = () => {
    return useContext(AmigosContext);
};
