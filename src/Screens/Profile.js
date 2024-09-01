import { ProfileMenuItems } from "../Components/Profile_Menu_Items";
import { ProfileTabSelector } from "../Components/Profile_Menu_Selectors";
import "./Profile.css";

import { useState } from "react";

function Profile() {
  const [profileTabIndex, setProfileTabIndex] = useState(0);

  const profileTabSelectorContent = (
    <>
      <ProfileMenuItems $isItemSelected={profileTabIndex===0 ? true : false}
        onClick={() => {
          setProfileTabIndex(0);
        }}
      >
        Posts
      </ProfileMenuItems>
      <ProfileMenuItems $isItemSelected={profileTabIndex===1 ? true : false}
        onClick={() => {
          setProfileTabIndex(1);
        }}
      >
        Avaliações
      </ProfileMenuItems>
      <ProfileMenuItems $isItemSelected={profileTabIndex===2 ? true : false}
        onClick={() => {
          setProfileTabIndex(2);
        }}
      >
        Comentários
      </ProfileMenuItems>
      <ProfileMenuItems $isItemSelected={profileTabIndex===3 ? true : false}
        onClick={() => {
          setProfileTabIndex(3);
        }}
      >
        Curtidas
      </ProfileMenuItems>
    </>
  );

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
        <ProfileTabSelector
          $currentProfileTabIndex={profileTabIndex}
          $profileTabContent={profileTabSelectorContent}
        />
      </section>
    </div>
  );
}

export default Profile;
