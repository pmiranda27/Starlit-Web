import { useState } from "react";
import "./Message.css";

import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { IoSend } from "react-icons/io5";

import { ContatoAmigos } from "../../Components/Messages/Contato";

import { useEffect } from "react";
import { FriendSectionLoader } from "../../Components/Loaders/Friends_Section";
import { MessageItem } from "../../Components/Messages/Message_Item";
import { useChat } from "../../Components/Services/Chat_Service";
import { useAuth } from "../../Components/Services/Api_Service";

function Chat() {
  const iconStyle = { color: "white" };

  const { getFriendsChatList, setMensagensList, sendMessage, chatSocket } = useChat();
  const { getCredentials } = useAuth();

  const [selectedFriend, setSelectedFriend] = useState(0);

  const [listaResponseAmigos, setListaResponseAmigos] = useState([]);
  const [listaAmigosContatos, setListaAmigosContatos] = useState([]);

  const [mensagemDigitadaAtual, setMensagemDigitadaAtual] = useState();

  const [friendsChatList, setFriendsChatList] = useState([]);

  const [listaMensagensCurrentUser, setListaMensagensCurrentUser] = useState(
    []
  );

  const [isLoadingContactsList, setIsLoadingContactsList] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function getContactsList() {
        const response = await getFriendsChatList();
  
        setFriendsChatList(response.data)

      if (isMounted) {
        setListaResponseAmigos(response.data);
        // ... handle friends mapping
        const newFriendsElements = friendsChatList.map((friend, ind) => (
          <ContatoAmigos
            key={friend.email}
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
      }
    }

    async function getMensagensList() {
      const response = await getFriendsChatList();

      const newMensagensElements = response.data.map(
        (message, ind) => (
          <MessageItem
            key={ind}
            conteudoMensagem={message.content}
            autoriaPropria={message.sender === getCredentials().email ? true : false}
          />
        )
      );

      setListaMensagensCurrentUser(newMensagensElements);
    }

    async function enviarMensagem(receiverEmail) {
      if (
        !mensagemDigitadaAtual ||
        mensagemDigitadaAtual === "" ||
        mensagemDigitadaAtual.replace(/\s+/g, "").length < 1
      ) {
        return;
      }

      
      const maxRetries = 5;
      for(let attempt = 0; attempt < maxRetries; attempt++){  
        var response = sendMessage(listaResponseAmigos[selectedFriend].email, mensagemDigitadaAtual);

        if (response.status === 200) {
          setMensagemDigitadaAtual('');
          console.log("mensagem enviada com sucesso!", response);
          getMensagensList();
          break;
        } else {
          console.log('envio falhado', response);
          continue;
        }
      }
    }

    return () => {
      isMounted = false;
    };
  }, [getCredentials, selectedFriend, chatSocket, setMensagensList, getFriendsChatList, listaResponseAmigos, mensagemDigitadaAtual, sendMessage]);

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
                    // enviarMensagem(listaResponseAmigos[selectedFriend].email);
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
