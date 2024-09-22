import './Message_Item.css'

export const MessageItem = ({
    conteudoMensagem,
    autoriaPropria
}) => {
    return <div className={`corpo-message-item ${autoriaPropria ? `autoria-propria` : ``}`}>
        <p>{conteudoMensagem}</p>
    </div>
}