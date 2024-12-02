import { IoSend } from "react-icons/io5";
import { ContatoTileChat } from "../../Components/Chat/Contato_Tile";
import { useAmigos } from "../../Components/Services/Amigos_Service";
import "./Message.css";

import { useEffect, useRef, useState } from "react";
import { connect } from "socket.io-client";
import { MensagemTile } from "../../Components/Chat/MensagemTile";

function Chat() {
  const iconStyle = { color: "white" };

  const { getListaAmigos } = useAmigos();

  const webSocketUrl = process.env.REACT_APP_WEB_SOCKET_URL;

  const chatListaRef = useRef(null);

  const [socket, setSocket] = useState();
  const [listaObjetosAmigos, setListaObjetosAmigos] = useState([]);
  const [listaAmigosContatos, setListaAmigosContatos] = useState([]);
  const [amigoContatoIndex, setAmigoContatoIndex] = useState(0);
  const [corpoTextoMensagem, setCorpoTextoMensagem] = useState("");

  async function getListaContatos() {
    const response = await getListaAmigos(sessionStorage.getItem("username"));
    setListaObjetosAmigos(response);
  }

  function componentGeneratorAmigos(lista) {
    if (!lista) {
      return;
    }

    const novaListaComponents = lista.map((ami, index) => (
      <ContatoTileChat key={index} onClick={() => changeSelectedUser(index)}>
        <img draggable={false} src={ami.avatar} />
        <h3>{ami.name}</h3>
      </ContatoTileChat>
    ));

    setListaAmigosContatos(novaListaComponents);
  }

  function changeSelectedUser(index) {
    setAmigoContatoIndex(index);
  }

  useEffect(() => {
    const ws = new WebSocket(`${webSocketUrl}`);

    ws.onopen = () => {
      console.log("Conectado ao WebSocket!");
      const username = sessionStorage.getItem("username");
      ws.send(JSON.stringify({ type: "auth", username })); // Envia nome de usuário ao servidor
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.status !== "delivered") {
        receberMessage(message);
      }
    };

    ws.onclose = () => {
      console.log("Conexão WebSocket fechada");
    };

    ws.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
    };

    setSocket(ws);
  }, []);

  useEffect(() => {
    getListaContatos();
  }, []);

  useEffect(() => {
    componentGeneratorAmigos(listaObjetosAmigos);
  }, [listaObjetosAmigos]);

  const receberMessage = (message) => {
    // Atualiza as mensagens do amigo específico
    setListaObjetosAmigos((prevLista) => {
      return prevLista.map((amigo) => {
        if (message.sender === amigo.name) {
          // Se o amigo tem mensagens, adicione a nova mensagem
          const updatedMessages = [...(amigo.messages || []), {
            sender: message.sender,
            content: message.content,
          }];
          
          // Retorna o amigo atualizado com as novas mensagens
          return { ...amigo, messages: updatedMessages };
        }
        return amigo;
      });
    });
  };

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      if (corpoTextoMensagem) {
        const message = {
          sender: sessionStorage.getItem("username"),
          receiver: listaObjetosAmigos[amigoContatoIndex]?.name,
          content: corpoTextoMensagem,
          timestamp: new Date().toISOString(),
        };

        // Atualiza a interface imediatamente
        setListaObjetosAmigos((prevLista) => {
          return prevLista.map((amigo) => {
            if (amigo.name === message.receiver) {
              const updatedMessages = [...(amigo.messages || []), message];
              return { ...amigo, messages: updatedMessages };
            }
            return amigo;
          });
        });

        // Envia a mensagem via WebSocket
        socket.send(JSON.stringify(message));
        setCorpoTextoMensagem('');
      }
    } else {
      console.error("WebSocket não está conectado");
    }
  };

  useEffect(() => {
    if (chatListaRef.current) {
      chatListaRef.current.scrollTop = chatListaRef.current.scrollHeight;
    }
  }, [listaObjetosAmigos, amigoContatoIndex]);

  return (
    <>
      <div className="chat-main">
        <section className="lista-de-contatos-chat">
          {listaAmigosContatos}
        </section>
        <section className="contato-selecionado">
          {listaObjetosAmigos && listaObjetosAmigos.length > 0 ? (
            <>
              <img
                draggable={false}
                src={listaObjetosAmigos[amigoContatoIndex]?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                alt="Foto usuário"
              />
              <h2>{listaObjetosAmigos[amigoContatoIndex]?.name || ""}</h2>
            </>
          ) : (
            <p>Nenhum contato selecionado</p>
          )}
        </section>

        <section className="area-de-conversa-chat">
          <div className="chat-lista" ref={chatListaRef}>
            {listaObjetosAmigos &&
              listaObjetosAmigos[amigoContatoIndex]?.messages?.map((msg, index) => (
                <MensagemTile
                  key={index}
                  content={msg.content}
                  isSender={msg.sender === sessionStorage.getItem("username")}
                />
              ))}
          </div>
          <div className="input-area-conversa-chat">
            <textarea
              name="textarea-input-conversa-chat"
              className="textarea-input-conversa-chat"
              placeholder="Escreva aqui"
              value={corpoTextoMensagem}
              onChange={(e) => setCorpoTextoMensagem(e.target.value)}
            ></textarea>

            <button className="send-message-button-conversa-chat" onClick={sendMessage}>
              <IoSend />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Chat;
