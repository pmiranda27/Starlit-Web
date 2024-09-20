import { useState } from "react";
import "./Message.css";

import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";

import axios from "axios";

import { ApiService } from "../../Components/Services/Api_Service";
import { ContatoAmigos } from "../../Components/Messages/Contato";

import { useEffect } from "react";

function Chat() {
  const iconStyle = { color: "white" };

  const [credentials, setCredentials] = useState(null);
  const [loggedToken, setLoggedToken] = useState();

  const [listaAmigosContatos, setListaAmigosContatos] = useState([])

  async function getFriendsList() {
    try {
      const response = await axios.post(`${ApiService.apiUrl}/user/amigos`, {
        email: credentials.email,
      });

      const newFriendsElements = response.data.map((friend, ind) => (
        <ContatoAmigos imageUrl={friend.avatar} nomeAmigo={friend.name} />
      ));

      setListaAmigosContatos(newFriendsElements);
    } catch (error) {
      console.error(
        "Erro ao obter lista de amigos:",
        error.response?.data || error.message
      );
    }
  }

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

  function refreshEverythingUserHas(){
    getFriendsList();
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

    const refreshInterval = setInterval(() => {
      refreshEverythingUserHas();
    }, 2500);

    return () => clearInterval(refreshInterval);
  }, [credentials]);

  return (
    <>
      <div className="chat-main">
        <section className="friend-list">
          <div className="link-card-chat">
            <IoChatboxEllipsesSharp style={iconStyle} />
            Contatos
          </div>
          <div className="lista-contatos-messages">
            {listaAmigosContatos}
          </div>
        </section>
        <section className="chat-section">
          <div className="center-contato-nome">
            <div className="contato-name">
              <img src="https://placehold.co/80" alt="" />
              Nome do Contato
            </div>
          </div>
          <div className="chat-texts">
            <div className="chat-text-zone"></div>
            <div className="input-text-zone">
              <div className="input-box">
                <textarea name="input-chat" id="input-chat"></textarea>
                <div className="send-input-chat">
                  <IoSend size={'30px'} style={{ color: "rgb(163, 58, 114)" }} />
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
