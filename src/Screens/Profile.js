import "./Profile.css";

function Profile() {
  return (
    <div className="profile-main">
      <section className="profile-info-section">
        <img
          src="https://placehold.co/240"
          alt=""
          className="profile-info-image"
        />
        <div className="profile-info-text">
          <div className="profile-info-first-line">
            <h2>Nome do Usuário</h2>
            <div className="edit-profile-button">Editar Perfil</div>
          </div>
          <div className="profile-info-second-line">
            <h3>
              <span className="segue-number-span">999</span> Seguidores
            </h3>
            <h3>
              <span className="segue-number-span">999</span> Seguindo
            </h3>
          </div>
          <p className="profile-info-description">
            Alguém tem que chorar pros muleque rir 🤣🤣Alguém tem que chorar
            pros muleque rir 🤣🤣Alguém tem que chorar pros muleque rir
            🤣🤣Alguém tem que chorar pros muleque rir 🤣🤣Alguém tem que chorar
            pros muleque rir 🤣🤣Alguém tem que chorar pros muleque rir
            🤣🤣Alguém tem que chorar pros muleque rir 🤣🤣Alguém tem que chorar
            pros muleque rir 🤣🤣Alguém tem que chorar pros muleque rir
            🤣🤣Alguém tem que chorar pros muleque rir 🤣🤣
          </p>
        </div>
      </section>
      <section className="profile-tabs-section">
        <div className="profile-tab-selector">
          <h4>Posts</h4>
          <h4>Avaliações</h4>
          <h4>Comentários</h4>
          <h4>Curtidas</h4>
        </div>
      </section>
    </div>
  );
}

export default Profile;
