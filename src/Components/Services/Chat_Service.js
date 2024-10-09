import React, { createContext, useState, useContext, useEffect } from "react";


import axios from "axios";
import { useAuth } from "./Api_Service";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { getCredentials } = useAuth();

    const [currentUserMessages, setCurrentUserMessages] = useState([]);

    const [currentCredentialsChatService, setCurrentCredentialsChatService] = useState();

    async function connectToWebSocket() {

    }

    useEffect(() => {
        function onConnect() {
            console.log('websocket do chat conectado com sucesso')
        }

        function onDisconnect() {
            console.log('websocket do chat desconectado')
        }

        const chatSocket = new WebSocket(process.env.REACT_WEB_SOCKET_URL);

        chatSocket.onopen = () => onConnect();
        chatSocket.onclose = () => onDisconnect();

        return () => {
            chatSocket.close(); // Ensure socket is closed on unmount
        };
    }, [])

    async function setCurrentChatCredentials() {
        const credent = getCredentials();
        setCurrentCredentialsChatService(credent);
    }

    async function getFriendsChatList() {
        var tryGetFriendsChatList = 0;

        while (tryGetFriendsChatList <= 3) {
            var credencial = getCredentials();
            console.log('credencial: ', credencial)
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/amigos`, {
                    email: credencial.email,
                });
                console.log('OLHA AQUI: ', credencial)
                console.log('OLHA AQUI: ', response)

                return response;
            } catch (error) {
                console.error(
                    "Erro ao obter lista de amigos:",
                    error.response?.data || error.message
                );
                tryGetFriendsChatList++;
            }
        }
    }

    function getMensagensList() {
        return currentUserMessages;
    }

    async function setMensagensList(listaResponseAmigos, selectedFriend) {
        var currentTriesSetMensagensList = 0;
        while (currentTriesSetMensagensList <= 5) {
            if (!currentCredentialsChatService) {
                await setCurrentChatCredentials();
            }
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}/mensagem/lista-mensagens`,
                    {
                        email: currentCredentialsChatService.email,
                        friendEmail: listaResponseAmigos[selectedFriend].email,
                    }
                );

                console.log('currentUserMEssages: ', currentUserMessages);
                setCurrentUserMessages(response.data);
                break;
            } catch (error) {
                console.error(
                    "Erro ao obter mensagens do amigo:",
                    error.response?.data || error.message
                );
            }
        }
    }

    async function sendMessage(receiverEmail, mensagemDigitadaAtual) {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/mensagem/enviar-mensagem`,
                {
                    sender: currentCredentialsChatService.email,
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
        <ChatContext.Provider value={{ getFriendsChatList, getMensagensList, setMensagensList, sendMessage }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => {
    return useContext(ChatContext);
}