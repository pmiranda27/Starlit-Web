
import { useAmigos } from "../../Components/Services/Amigos_Service";
import "./Profile.css";

import { useEffect, useState } from "react";

function Profile() {
  const [statusSelectorIndex, setStatusSelectorIndex] = useState(0);
  const [selectedStatusBarPosition, setSelectedStatusBarPosition] = useState('profile-selectors-wrapper-posts-selected');

  const [userPicture, setUserPicture] = useState('');
  const [userName, setUserName] = useState('');

  const { getListaAmigos, getQuantidadeAmigos } = useAmigos();

  const [numeroAmigos, setNumeroAmigos] = useState(0);

  function changeSelectedStatusSelector(index) {
    setStatusSelectorIndex(index);
    moveSelectedStatusBar(index)
  }
  function moveSelectedStatusBar(index) {
    switch (index) {
      case 0:
        setSelectedStatusBarPosition('profile-selectors-wrapper-posts-selected');
        break;
      case 1:
        setSelectedStatusBarPosition('profile-selectors-wrapper-comments-selected');
        break;
      case 2:
        setSelectedStatusBarPosition('profile-selectors-wrapper-likes-selected');
        break;
    }
  }

  async function getQuantidadeAmigosNumber() {
    await getListaAmigos();

    setNumeroAmigos(getQuantidadeAmigos());
  }

  function refreshUserInformation() {
    const avatarUrl = sessionStorage.getItem('avatar');
    setUserPicture(avatarUrl);

    const userName = sessionStorage.getItem('username');
    setUserName(userName);

    getQuantidadeAmigosNumber();
  }

  useEffect(() => {
    refreshUserInformation();

    const refreshInterval = setInterval(() => {
      refreshUserInformation();
    }, 6500);

    return () => clearInterval(refreshInterval)
  }, [])

  return <div className="profile-main">
    <div className="profile-info-box">
      <img src={userPicture ? userPicture : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Foto do perfil" className="profile-picture-info" />
      <div className="text-info-profile">
        <div className="profile-text-info-first-line">
          <div className="profile-text-info-identifiers">
            <h3>{userName}</h3>
            <h4></h4>
          </div>
          <h3><span>{numeroAmigos}</span> {numeroAmigos === 1 ? 'amigo(a)' : 'amigos'}</h3>
          <h3><span></span> </h3>
        </div>
      </div>
    </div>
    <section className="profile-status">
      <div className="profile-status-selectors">
        <div className={`profile-selectors-wrapper ${selectedStatusBarPosition}`}>
          <div onClick={() => {
            changeSelectedStatusSelector(0)
          }} className={`profile-selector-option ${statusSelectorIndex === 0 ? `profile-selector-selected` : ''}`}>Posts</div>
          <div onClick={() => {
            changeSelectedStatusSelector(1)
          }} className={`profile-selector-option ${statusSelectorIndex === 1 ? `profile-selector-selected` : ''}`}>Comentários</div>
          <div onClick={() => {
            changeSelectedStatusSelector(2)
          }} className={`profile-selector-option ${statusSelectorIndex === 2 ? `profile-selector-selected` : ''}`}>Curtidas</div>
        </div>
      </div>
    </section>
  </div>
}

export default Profile;
