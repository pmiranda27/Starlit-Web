import { useState } from "react";
import "./Message.css";

import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";

import axios from "axios";

import { ApiService } from "../../Components/Services/Api_Service";
import { ContatoAmigos } from "../../Components/Messages/Contato";

import { useEffect } from "react";
import { FriendSectionLoader } from "../../Components/Loaders/Friends_Section";
import { MessageItem } from "../../Components/Messages/Message_Item";

function Chat() {
  const iconStyle = { color: "white" };

  const [credentials, setCredentials] = useState(null);
  const [loggedToken, setLoggedToken] = useState();

  const [selectedFriend, setSelectedFriend] = useState(0);

  const [listaResponseAmigos, setListaResponseAmigos] = useState([]);
  const [listaAmigosContatos, setListaAmigosContatos] = useState([]);

  const [mensagemDigitadaAtual, setMensagemDigitadaAtual] = useState();

  const [listaMensagensCurrentUser, setListaMensagensCurrentUser] = useState(
    []
  );

  const [isLoadingContactsList, setIsLoadingContactsList] = useState(true);

  const getCredentials = async () => {
    const creds = await verifyAuthentication();
    setCredentials(creds);
  };

  async function verifyAuthentication() {
    var verifyAuthenticationTries = 0;
    try {
      const isLoggedRequest = await axios.post(
        `${ApiService.apiUrl}/user/verify-auth`,
        { loggedToken },
        { timeout: 1250 }
      );

      return isLoggedRequest.data.decode;
    } catch (error) {
      console.log(`error: ${error}`);
      if (verifyAuthenticationTries > 3) {
        console.log("3 tentativas foram feitas, nenhuma funcionou!");
        verifyAuthenticationTries++;
      }
    }
  }

  async function getFriendsList() {
    try {
      const response = await axios.post(`${ApiService.apiUrl}/user/amigos`, {
        email: credentials.email,
      });

      setListaResponseAmigos(response.data);

      const newFriendsElements = response.data.map((friend, ind) => (
        <ContatoAmigos
          key={ind}
          contatoIndex={ind}
          imageUrl={friend.avatar}
          nomeAmigo={friend.name}
          emailAmigo={friend.email}
          setContatoIndex={setSelectedFriend}
          isSelected={selectedFriend === ind ? true : false}
        />
      ));

      setListaAmigosContatos(newFriendsElements);
      setIsLoadingContactsList(false);
    } catch (error) {
      console.error(
        "Erro ao obter lista de amigos:",
        error.response?.data || error.message
      );
    }
  }

  useEffect(() => {
    if (listaResponseAmigos.length > 0) {
      getMensagensList();
    }
  }, [listaResponseAmigos, selectedFriend]);

  async function getMensagensList() {
    try {
      const response = await axios.post(
        `${ApiService.apiUrl}/mensagem/lista-mensagens`,
        {
          email: credentials.email,
          friendEmail: listaResponseAmigos[selectedFriend].email,
        }
      );

      const newMensagensElements = response.data.listMessages.map(
        (message, ind) => (
          <MessageItem
            key={ind}
            conteudoMensagem={message.content}
            autoriaPropria={message.sender === credentials.email ? true : false}
          />
        )
      );

      setListaMensagensCurrentUser(newMensagensElements);
    } catch (error) {
      console.error(
        "Erro ao obter mensagens do amigo:",
        error.response?.data || error.message
      );
    }
  }

  async function enviarMensagem(receiverEmail) {
    if (
      !mensagemDigitadaAtual ||
      mensagemDigitadaAtual === "" ||
      mensagemDigitadaAtual.replace(/\s+/g, "").length < 1
    ) {
      return;
    }
    try {
      const response = await axios.post(
        `${ApiService.apiUrl}/mensagem/enviar-mensagem`,
        {
          sender: credentials.email,
          receiver: receiverEmail,
          content: mensagemDigitadaAtual,
        }
      );

      setMensagemDigitadaAtual('');

      console.log("mensagem enviada com sucesso!", response);
      getMensagensList();
    } catch (error) {
      console.log("falha ao enviar mensagem: ", error);
    }
  }

  var checkCred = 0;

  useEffect(() => {
    if (!credentials) {
      console.log("sem credenciais");
      setLoggedToken(localStorage.getItem("token"));
      getCredentials();
      return;
    } else if (checkCred < 1) {
      checkCred++;
      console.log("com credenciais: ", credentials);
    }

    async function refreshEverythingUserHas() {
      await getFriendsList();
    }

    const refreshInterval = setInterval(() => {
      refreshEverythingUserHas();
    }, 100);

    return () => clearInterval(refreshInterval);
  }, [credentials, selectedFriend]);

  return (
    <>
      <div className="chat-main">
        <section className="friend-list">
          <div className="link-card-chat">
            <IoChatboxEllipsesSharp style={iconStyle} />
            Contatos
          </div>
          <div className="lista-contatos-messages">
            {isLoadingContactsList ? (
              <FriendSectionLoader />
            ) : (
              listaAmigosContatos
            )}
          </div>
        </section>
        <section className="chat-section">
          <div className="center-contato-nome">
            {isLoadingContactsList ? (
              ""
            ) : (
              <div className="contato-name">
                <img
                  src={listaResponseAmigos[selectedFriend].avatar}
                  alt="Foto do perfil"
                />
                {listaResponseAmigos[selectedFriend].name}
              </div>
            )}
          </div>
          <div className="chat-texts">
            <div className="chat-text-zone">{listaMensagensCurrentUser}</div>
            <div className="input-text-zone">
              <div className="input-box">
                <textarea
                  name="input-chat"
                  id="input-chat"
                  value={mensagemDigitadaAtual}
                  onChange={(msg) => {
                    console.log("msg: ", msg.target.value);
                    setMensagemDigitadaAtual(msg.target.value);
                  }}
                ></textarea>
                <div
                  className="send-input-chat"
                  onClick={() => {
                    enviarMensagem(listaResponseAmigos[selectedFriend].email);
                  }}
                >
                  <IoSend
                    size={"30px"}
                    style={{ color: "rgb(163, 58, 114)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Chat;
