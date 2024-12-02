import './MensagemTile.css'

export const MensagemTile = ({ isSender, content }) => {

    return <div className={`mensagem-tile ${isSender ? 'mensagem-color-sender' : 'mensagem-color-receiver'}`}>
        <h2>{content}</h2>
    </div>
} 