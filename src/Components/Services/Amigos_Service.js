import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./Api_Service";
import axios from "axios";

const AmigosContext = createContext();

export const AmigosProvider = ({ children }) => {
    const { getCredentials } = useAuth();

    const apiUrl = process.env.REACT_APP_API_URL;
    const tentativasMaximasRequests = 5;
    var credenciaisAmigos = null;

    async function refreshCredenciaisAmigos() {
        for (var tentativaCred = 0; tentativaCred < tentativasMaximasRequests; tentativaCred++) {
            if (!credenciaisAmigos) {
                const cred = await getCredentials();
                console.log('cred: ', cred)
                credenciaisAmigos = cred;
                console.log('credenciaisAmigos: ', credenciaisAmigos)
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

        for (var tentativa = 0; tentativa < tentativasMaximasRequests; tentativa++) {
            console.log('tentando fazer get da lista de amigos: ', credenciaisAmigos)
            const responseListaAmigos = await axios.post(`${apiUrl}/user/amigos`, {
                email: credenciaisAmigos.email
            });

            if (!responseListaAmigos) {
                continue;
            }
            if (responseListaAmigos.status < 200 || responseListaAmigos.status > 299) {
                console.log('erro no get da lista de amigos: ', responseListaAmigos);
                continue
            }

            console.log("FIM DA LISTA DE AMIGOS: ", responseListaAmigos.data);
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
            console.log('tentando fazer get da lista de usuários: ', credenciaisAmigos)
            const responseListaUsuarios = await axios.get(`${apiUrl}/user/lista-usuarios`);
            if (!responseListaUsuarios) {
                continue;
            }
            if (responseListaUsuarios.status < 200 || responseListaUsuarios.status > 299) {
                console.log('erro no get da lista de usuários: ', responseListaUsuarios);
                continue
            }

            const listaUsuariosFiltradaLoggedUser = responseListaUsuarios.data.filter(
                (user) => user.email !== credenciaisAmigos.email
            );

            const listaAmigos = await getListaAmigos();

            const listaUsuariosFiltradaAmigosELoggedUser = listaUsuariosFiltradaLoggedUser.filter(
                (user) =>
                    !listaAmigos.some((amigo) => amigo.email === user.email)
            );

            console.log("AMIGOSPROVIDER CREDENCIAIS: ", credenciaisAmigos);
            console.log("FIM DA LISTA DE USUARIOS FILTRADA: ", listaUsuariosFiltradaAmigosELoggedUser);
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

        console.log('passei da verificação das credenciais amigos: ', credenciaisAmigos)

        for (var tentativa = 0; tentativa < tentativasMaximasRequests; tentativa++) {
            console.log('tentando fazer get da lista de notificações: ', credenciaisAmigos)
            const responseListaNotificacoes = await axios.post(`${apiUrl}/user/lista-notificacoes`, {
                email: credenciaisAmigos.email
            });

            if (!responseListaNotificacoes) {
                continue;
            }
            if (responseListaNotificacoes.status < 200 || responseListaNotificacoes.status > 299) {
                console.log('erro no get da lista de amigos: ', responseListaNotificacoes);
                continue
            }

            console.log("FIM DA LISTA DE NOTIFICAÇÕES: ", responseListaNotificacoes.data);
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
