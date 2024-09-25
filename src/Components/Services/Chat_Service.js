import React, { createContext, useState, useContext } from "react";

import axios from "axios";
import { useAuth } from "./Api_Service";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { getCredentials } = useAuth();

    console.log('Credenciais: ', getCredentials());

    var credencial = getCredentials();
    console.log('robertao ', credencial)

    async function getFriendsChatList() {
        credencial = getCredentials();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/amigos`, {
                email: credencial.email,
            });

            return response;
        } catch (error) {
            console.error(
                "Erro ao obter lista de amigos:",
                error.response?.data || error.message
            );
        }
    }

    async function getMensagensList(listaResponseAmigos, selectedFriend) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/mensagem/lista-mensagens`,
                {
                    email: getCredentials().email,
                    friendEmail: listaResponseAmigos[selectedFriend].email,
                }
            );

            return response
        } catch (error) {
            console.error(
                "Erro ao obter mensagens do amigo:",
                error.response?.data || error.message
            );
        }
    }

    async function sendMessage(receiverEmail, mensagemDigitadaAtual) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/mensagem/enviar-mensagem`,
                {
                    sender: getCredentials().email,
                    receiver: receiverEmail,
                    content: mensagemDigitadaAtual,
                }
            );

            return response;
        } catch (error) {
            console.log("falha ao enviar mensagem: ", error);
        }
    }

    return (
        <ChatContext.Provider value={{ getFriendsChatList, getMensagensList, sendMessage }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    return useContext(ChatContext);
}