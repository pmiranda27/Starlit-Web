import { ContatoTileChat } from "../../Components/Chat/Contato_Tile";
import { useAmigos } from "../../Components/Services/Amigos_Service";
import "./Message.css";

import { useEffect, useState } from "react";

function Chat() {
  const iconStyle = { color: "white" };

  const { getListaAmigos } = useAmigos();

  const [listaObjetosAmigos, setListaObjetosAmigos] = useState();
  const [listaAmigosContatos, setListaAmigosContatos] = useState([]);

  async function getListaContatos() {
    const response = await getListaAmigos();

    setListaObjetosAmigos(response);
  }

  function componentGeneratorAmigos(lista) {
    if(!lista){
      return;
    }
    console.log('diglet', lista)
    var novaListaComponents = lista.map((ami) => (
      <ContatoTileChat>
        <h3>{ami.name}</h3>
      </ContatoTileChat>));

    setListaAmigosContatos(novaListaComponents)
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
          {}
        </section>
        <section className="area-de-conversa-chat"></section>
      </div>
    </>
  );
}

export default Chat;
