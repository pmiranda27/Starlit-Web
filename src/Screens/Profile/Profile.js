
import axios from "axios";
import { useAmigos } from "../../Components/Services/Amigos_Service";
import { useAuth } from "../../Components/Services/Api_Service";
import "./Profile.css";

import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

function Profile({ nicknameToSearch, needToLoad, goToConfigPage }) {
  const [statusSelectorIndex, setStatusSelectorIndex] = useState(0);
  const [selectedStatusBarPosition, setSelectedStatusBarPosition] = useState('profile-selectors-wrapper-posts-selected');

  const [userPicture, setUserPicture] = useState('');
  const [userName, setUserName] = useState('');

  const { getListaAmigos, getQuantidadeAmigos } = useAmigos();
  const { getReviewsQuantity, getDescricaoText } = useAuth();

  const [numeroAmigos, setNumeroAmigos] = useState(0);
  const [numeroReviews, setNumeroReviews] = useState(0);
  const [textoDescricao, setTextoDescricao] = useState('');

  const [isLoadingInfo, setIsLoadingInfo] = useState(true);

  const [userReviews, setUserReviews] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  function changeSelectedStatusSelector(index) {
    setStatusSelectorIndex(index);
    moveSelectedStatusBar(index);
  
    const nickname = nicknameToSearch || sessionStorage.getItem('username');
    
    if (index === 0) {
      getUserReviews(nickname); // Busca reviews do usuário.
    } else if (index === 1) {
      getUserComments(nickname); // Busca comentários do usuário.
    }
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
  
  const updateProfileInfo = async (nickname) => {
    try {
      const responseAvatar = await axios.get(`${process.env.REACT_APP_API_URL}/user/avatar-usuario`, {
        params: { nickname },
      });
      const avatarRequest = responseAvatar.data.avatar;

      const friendsList = await getListaAmigos(nickname);
      const reviewsCount = await getReviewsQuantity(nickname);
      const descricaoText = await getDescricaoText(nickname);

      // Atualizando os estados com os dados do API
      setUserPicture(avatarRequest);
      setUserName(nickname);
      setNumeroAmigos(friendsList.length);
      setNumeroReviews(reviewsCount);
      setTextoDescricao(descricaoText);

      setIsLoadingInfo(false);
    } catch (error) {
      console.error("Erro ao buscar informações do perfil:", error);
    }
  };

  async function getQuantidadeAmigosNumber(nicknameRequest) {
    const listaAmigos = await getListaAmigos(nicknameRequest);

    setNumeroAmigos(listaAmigos.length);
  }

  async function getQuantidadeReviewsNumber() {
    const usernameToSearch = sessionStorage.getItem('username');

    setNumeroReviews(await getReviewsQuantity(usernameToSearch))
  }

  async function getTextoDescricao() {
    const usernameToSearch = sessionStorage.getItem('username');

    setTextoDescricao(await getDescricaoText(usernameToSearch))

    console.log('recebi: ', textoDescricao)
  }

  async function getAvatarUser(nicknameRequest) {
    var avatarRequest;

    if (!nicknameToSearch) {
      avatarRequest = sessionStorage.getItem('avatar');
    } else {
      const responseAvatar = await axios.get(`${process.env.REACT_APP_API_URL}/user/avatar-usuario`, {
        params: {
          nickname: nicknameRequest
        }
      })

      avatarRequest = responseAvatar.data.avatar;
    }

    setUserPicture(avatarRequest);
  }

  const getUserReviews = async (nickname) => {
    setIsLoadingContent(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/get-reviews-por-usuario`, {
        params: { nickname },
      });

      setUserReviews(response.data.reviews);

    } catch (error) {
      console.error("Erro ao buscar reviews do usuário:", error);

    } finally {
      setIsLoadingContent(false);
    }
  };

  const getUserComments = async (nickname) => {
    setIsLoadingContent(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/get-comentarios-por-username`, {
        params: { nickname },
      });
      setUserComments(response.data.comentarios);

    } catch (error) {
      console.error("Erro ao buscar comentários do usuário:", error);
    } finally {
      setIsLoadingContent(false);
    }
  };
  
  

  function refreshUserInformation() {
    var nicknameRequest = nicknameToSearch || sessionStorage.getItem('username');

    console.log('Usando nickname:', nicknameRequest);


    getAvatarUser(nicknameRequest);

    setUserName(nicknameRequest);

    getQuantidadeAmigosNumber(nicknameRequest);

    getQuantidadeReviewsNumber();

    getTextoDescricao();
  }

  useEffect(() => {
    const nickname = nicknameToSearch || sessionStorage.getItem('username');
    updateProfileInfo(nickname);

    getUserReviews(nickname);

    const refreshInterval = setInterval(() => {
      updateProfileInfo(nickname);
    }, 6500);

    return () => clearInterval(refreshInterval)
  }, [nicknameToSearch])

  useEffect(() => {
    setIsLoadingInfo(true)
  }, [needToLoad])

  return <div className="profile-main">
    <div className="profile-info-box">
      <FiEdit className={`edit-button-profile ${userName == sessionStorage.getItem('username') ? '' : 'edit-profile-button-invisible'}`} onClick={() => {
        if (userName == sessionStorage.getItem('username')) {
          goToConfigPage();
        }
      }} />
      <div className="profile-picture-info">
        {
          isLoadingInfo ? (<div className="loading-profile-image"></div>)
            :
            (<img src={userPicture ? userPicture : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Foto do perfil" />)
        }
      </div>

      <div className="text-info-profile">
        <div className="profile-text-info-first-line">
          <div className={`${isLoadingInfo ? 'profile-text-info-identifiers-is-loading' : 'profile-text-info-identifiers'}`}>
            <h3>{isLoadingInfo ? '' : `${userName}`}</h3>
            <h4></h4>
          </div>
          <div className={`profile-text-info-numbers`}>
            <div className={`profile-text-info-numbers-inside ${isLoadingInfo ? 'profile-text-info-numbers-is-loading' : ''}`}>
              <h3 className={`${isLoadingInfo ? 'profile-numero-amigos-invisible' : ''}`}><span>{numeroAmigos}</span> {numeroAmigos === 1 ? 'amigo(a)' : 'amigos'}</h3>
              <h3 className={`${isLoadingInfo ? 'profile-numero-reviews-invisible' : ''}`}><span>{numeroReviews}</span> {numeroReviews === 1 ? 'review' : 'reviews'} </h3>
            </div>
          </div>
        </div>
        <div className="profile-text-info-second-line">
          {textoDescricao}
        </div>
      </div>
    </div>
    <section className="profile-status">
  <div className="profile-status-selectors">
    <div className={`profile-selectors-wrapper ${selectedStatusBarPosition}`}>
      <div
        onClick={() => changeSelectedStatusSelector(0)}
        className={`profile-selector-option ${statusSelectorIndex === 0 ? `profile-selector-selected` : ''}`}>
        Posts
      </div>
      <div
        onClick={() => changeSelectedStatusSelector(1)}
        className={`profile-selector-option ${statusSelectorIndex === 1 ? `profile-selector-selected` : ''}`}>
        Comentários
      </div>
      <div
        onClick={() => changeSelectedStatusSelector(2)}
        className={`profile-selector-option ${statusSelectorIndex === 2 ? `profile-selector-selected` : ''}`}>
        Curtidas
      </div>
    </div>
  </div>
  
  <div className="profile-status-content">
    {isLoadingContent ? (
      <div>Carregando...</div>
    ) : statusSelectorIndex === 0 ? (
      <div className="user-posts">
        {userReviews.length > 0 ? (
          userReviews.map((review) => (
            <div key={review._id} className="post-item">
              <h3>{review.tituloFilme}</h3>
              <p>{review.descricao}</p>
            </div>
          ))
        ) : (
          <p>Nenhuma review encontrada.</p>
        )}
      </div>
    ) : statusSelectorIndex === 1 ? (
      <div className="user-comments">
        {userComments.length > 0 ? (
          userComments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <p>{comment.texto}</p>
              <small>Em: {comment.reviewTitulo}</small>
            </div>
          ))
        ) : (
          <p>Nenhum comentário encontrado.</p>
        )}
      </div>
    ) : (
      <div className="likes-content">
        <p>Conteúdo de Curtidas em desenvolvimento...</p>
      </div>
    )}
  </div>
</section>

  </div>
}

export default Profile;
