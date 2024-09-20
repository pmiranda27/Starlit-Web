import './Contato.css';

export const ContatoAmigos = ({ imageUrl, nomeAmigo }) => {
    return <div className='contato-component'>
        <img className="contato-avatar-image" src={`${imageUrl}`} alt="Foto Perfil" />
        <h3>{nomeAmigo}</h3>
    </div>
}