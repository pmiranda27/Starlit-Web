import { IoSend } from "react-icons/io5";
import { ContatoTileChat } from "../../Components/Chat/Contato_Tile";
import { useAmigos } from "../../Components/Services/Amigos_Service";
import "./Message.css";

import { useEffect, useState } from "react";

function Chat() {
  const iconStyle = { color: "white" };

  const { getListaAmigos } = useAmigos();

  const [listaObjetosAmigos, setListaObjetosAmigos] = useState();
  const [listaAmigosContatos, setListaAmigosContatos] = useState([]);

  const [amigoContatoIndex, setAmigoContatoIndex] = useState(0);

  const [corpoTextoMensagem, setCorpoTextoMensagem] = useState('');

  async function getListaContatos() {
    const response = await getListaAmigos();

    setListaObjetosAmigos(response);
  }

  function componentGeneratorAmigos(lista) {
    if (!lista) {
      return;
    }
    console.log('diglet', lista)
    var novaListaComponents = lista.map((ami, index) => (
      <ContatoTileChat key={index} onClick={() => {
        changeSelectedUser(index);
      }}>
        <img draggable={false} src={ami.avatar} />
        <h3>{ami.name}</h3>
      </ContatoTileChat>));

    setListaAmigosContatos(novaListaComponents)
  }

  function changeSelectedUser(index) {
    setAmigoContatoIndex(index);
  }

  useEffect(() => {
    getListaContatos();
  }, []);

  useEffect(() => {
    componentGeneratorAmigos(listaObjetosAmigos);
  }, [listaObjetosAmigos])

  return (
    <>
      <div className="chat-main">
        <section className="lista-de-contatos-chat">
          {listaAmigosContatos}
        </section>
        <section className="contato-selecionado">
          <img draggable={false} src={listaObjetosAmigos ? listaObjetosAmigos[amigoContatoIndex].avatar : ''} alt="Foto usuário" />
          <h2>{listaObjetosAmigos ? listaObjetosAmigos[amigoContatoIndex].name : ''}</h2>
        </section>
        <section className="area-de-conversa-chat">
          <div className="input-area-conversa-chat">
            <textarea name="textarea-input-conversa-chat" className="textarea-input-conversa-chat" placeholder="Escreva aqui" value={corpoTextoMensagem} onChange={(e) => {
              setCorpoTextoMensagem(e.target.value)
            }}></textarea>

            <button className="send-message-button-conversa-chat">
              <IoSend />
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default Chat;
