import "./Contato.css";

export const ContatoAmigos = ({
  imageUrl,
  nomeAmigo,
  contatoIndex,
  setContatoIndex,
  isSelected,
}) => {
  return (
    <div
      className={`contato-component ${isSelected ? `contato-selected` : ``}`}
      onClick={() => {
        setContatoIndex(contatoIndex);
      }}
    >
      <img
        className="contato-avatar-image"
        src={`${imageUrl}`}
        alt="Foto Perfil"
      />
      <h3>{nomeAmigo}</h3>
    </div>
  );
};
