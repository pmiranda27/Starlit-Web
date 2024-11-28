import "./Home_Screen.css";
import axios from "axios";
import axiosRetry from "axios-retry";
import { useState, useEffect } from "react";

import lupa from "../../Assets/Images/lupa.png";

import AmigoComponent from "../../Components/Friends/Amigo_Component";
import UserComponent from "../../Components/Friends/User_Component";
import NotificacaoComponent from "../../Components/Notifications/Notificacao";
import AddUsersList from "../../Components/Friends/Add_Users_List";
import { IoPersonAdd } from "react-icons/io5";
import { MdCircleNotifications, MdNotificationImportant } from "react-icons/md";
import { IoIosCloseCircle, IoIosNotifications } from "react-icons/io";
import { FriendSectionLoader } from "../../Components/Loaders/Friends_Section";
import { FriendRequestPopUp } from "../../Components/PopUpConfirm";
import { NotificacaoTab } from "../../Components/Notifications/Notificacao_Tab";
import { useAuth } from "../../Components/Services/Api_Service";
import { useAmigos } from "../../Components/Services/Amigos_Service";
import { NewPostPanel } from "../../Components/Feed/New_Post";
import { Loader } from "../../Components/Loaders/Loader_Welcome";
import { FaSearch } from "react-icons/fa";
import { MovieReview } from "../../Components/Feed/Review";

function HomeScreen({ goToProfilePage }) {
  const { getCredentials } = useAuth();
  const { getListaAmigos, refreshCredenciaisAmigos, getAllUsersExceptLoggedUserAndFriends, getNotificacoesUsuario } = useAmigos();

  const [listaAmigos, setListaAmigos] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaNotifications, setListaNotifications] = useState([]);

  const [listaNomeAmigos, setListaNomeAmigos] = useState([]);

  const [isShowingFriendRequestPopUp, setIsShowingFriendRequestPopUp] =
    useState(false);
  const [isLoadingFriendSection, setIsLoadingFriendSection] = useState(true);
  const [isLoadingAllUsersSection, setIsLoadingAllUsersSection] =
    useState(true);
  const [isLoadingNotificationsSection, setIsLoadingNotificationsSection] =
    useState(true);

  const [areNotificationsOpen, setAreNotificationsOpen] = useState(false);
  const [
    isShowingNotificationsComponents,
    setIsShowingNotificationsComponents,
  ] = useState(false);

  const [isShowingNewPostPanel, setIsShowingNewPostPanel] = useState(false);

  const [listaPostsAmigos, setListaPostsAmigos] = useState([]);

  var credentialsHomeScreen;

  function setCredentialsHomeScreen() {
    credentialsHomeScreen = getCredentials();
  }

  async function getFriendsItemsList() {
    const friendList = await getListaAmigos(sessionStorage.getItem('username'))

    setListaNomeAmigos(friendList);

    const listaComponentesAmigos = friendList.map((friend, ind) => (
      <AmigoComponent
        key={friend.email}
        name={friend.name}
        imgUrl={friend.avatar}
        userEmail={credentialsHomeScreen.email}
        emailFriend={friend.email}
        refreshFriend={getFriendsItemsList}
        functionToGoToProfile={goToProfilePage}
      />
    ));

    setListaAmigos(listaComponentesAmigos);
  }

  async function getAllUsersListFiltered() {
    const listaUsuarios = await getAllUsersExceptLoggedUserAndFriends();

    const listaComponentesUsuarios = listaUsuarios.map(
      (user, ind) => (
        <UserComponent
          key={user.email}
          name={user.username}
          functionToGoToProfile={goToProfilePage}
          loggedUserName={credentialsHomeScreen.username}
          userEmail={user.email}
          loggedUserEmail={credentialsHomeScreen.email}
          imgUrl={user.avatar}
          setIsShowingFriendRequestPopUp={setIsShowingFriendRequestPopUp}
          refreshFriendsList={getFriendsItemsList} // Passa a função para o UserComponent
          isFriendRequested={user.friendRequests.some(
            (friendRequestUser) =>
              friendRequestUser.sender === credentialsHomeScreen.email
          )}
        />
      )
    );

    setListaUsuarios(listaComponentesUsuarios);
  }

  const getUserNotifications = async () => {
    const listaNotificacoes = await getNotificacoesUsuario();

    const listaComponentesNotificacoes = listaNotificacoes.map(
      (notification, ind) => (
        <NotificacaoComponent
          key={ind}
          notificationId={notification._id}
          name={notification.name}
          avatar={notification.avatar}
          userEmail={credentialsHomeScreen["email"]}
          onNotificationAnswered={refreshEverythingUserHas}
        />
      )
    );

    setListaNotifications(listaComponentesNotificacoes);
  }

  async function refreshEverythingUserHas() {
    if (!credentialsHomeScreen) return;

    await getUserNotifications();
    setIsLoadingAllUsersSection(false);

    await getAllUsersListFiltered();
    setIsLoadingNotificationsSection(false);

    await getFriendsItemsList();
    setIsLoadingFriendSection(false);
  }

  // async function refreshPosts() {
  //   const username = sessionStorage.getItem('username');
  //   var postsAmigos;


  //   for (var tentativa = 0; tentativa < 10; tentativa++) {
  //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/`);
  //     const listaPosts = response.data;

  //     if (!listaNomeAmigos) {
  //       continue
  //     }

  //     postsAmigos = listaPosts.filter(post =>
  //       post.autorReview === username || listaNomeAmigos.includes(post.autorReview)
  //     );

  //     console.log('fkg', postsAmigos)
  //     console.log('fodk', listaPosts)

  //     break;
  //   }


  //   for (var tentativa = 0; tentativa < 10; tentativa++) {
  //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/get-reviews-por-filme`, {
  //       params: 
  //     });
  //     const listaPosts = response.data;

  //     if (!listaNomeAmigos) {
  //       continue
  //     }

  //     // postsAmigos = listaPosts.filter(post =>
  //     //   post.autorReview === username || listaNomeAmigos.includes(post.autorReview)
  //     // );

  //     postsAmigos = listaPosts;

  //     console.log('fodk', listaPosts)

  //     break;
  //   }

  //   const listaComponentesReviews = postsAmigos.map((review, ind) => (
  //     <MovieReview
  //       key={review._id}
  //       nomeReview={review.tituloFilme}
  //       notaReview={review.nota}
  //       bannerFilme={review.bannerFilme}
  //       descricaoReview={review.descricao}
  //       autorReview={review.autorReview}
  //       avatarAutor={review.autorAvatar}
  //     />
  //   ));

  //   setListaPostsAmigos(listaComponentesReviews);
  // }
  
  async function refreshPosts() {
    const username = sessionStorage.getItem('username');
    let postsAmigos = [];
    let listaFilmes = [];
    let mapReviewsPorFilme = new Map();
  
    try {
      const responseReviews = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/`);
      const listaPosts = responseReviews.data;
  
      if (!listaPosts || listaPosts.length === 0) return;
  
      listaFilmes = [...new Set(listaPosts.map(post => post.tituloFilme))];
  
      for (const tituloFilme of listaFilmes) {
        const responseFilme = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/get-reviews-por-filme`, {
          params: { tituloFilme },
        });
  
        const reviewsFilme = responseFilme.data;
  
        if (reviewsFilme && reviewsFilme.length > 0) {
          mapReviewsPorFilme.set(
            tituloFilme,
            reviewsFilme.map(review => review.autorReview).filter(autor => autor !== username)
          );
        }
      }
  
      postsAmigos = listaPosts.map(review => {
        const usuariosQueFizeramReview = mapReviewsPorFilme.get(review.tituloFilme) || [];
  
        return (
          <MovieReview
            key={review._id}
            nomeReview={review.tituloFilme}
            notaReview={review.nota}
            bannerFilme={review.bannerFilme}
            descricaoReview={review.descricao}
            autorReview={review.autorReview}
            avatarAutor={review.autorAvatar}
            usuariosQueFizeramReview={usuariosQueFizeramReview}
          />
        );
      });
  
      setListaPostsAmigos(postsAmigos);
    } catch (error) {
      console.error('Erro ao carregar as reviews:', error);
    }
  }

  useEffect(() => {
    if (!credentialsHomeScreen) {
      setCredentialsHomeScreen();
    }
    console.log("Credenciais atuais: ", credentialsHomeScreen);

    refreshEverythingUserHas();

    refreshPosts();

    const refreshInterval = setInterval(() => {
      refreshEverythingUserHas();
      refreshPosts();
    }, 6500);

    return () => clearInterval(refreshInterval);
  }, [credentialsHomeScreen]);

  const iconStyle = { color: "white" };

  const [isAddingFriends, setIsAddingFriends] = useState(false);

  const handleNotificationClick = (action) => {
    if (action) {
      console.log('foi true')
      setAreNotificationsOpen(true);
      setTimeout(() => {
        setIsShowingNotificationsComponents(true);
        console.log('abri: ', action)
      }, 350);
    } else {
      console.log('foi false')
      setAreNotificationsOpen(false);
      setTimeout(() => {
        setIsShowingNotificationsComponents(false);
        console.log('fechei: ', action)
      }, 350);
    }
  };

  const closeNewPostScreen = () => {
    setIsShowingNewPostPanel(false)
  }

  const openNewPostScreen = () => {
    setIsShowingNewPostPanel(true);
  }

  return (
    <>
      <div className="home-screen-main">
        <NewPostPanel closeNewPostScreen={closeNewPostScreen} isCreatingNewPost={isShowingNewPostPanel} />
        <FriendRequestPopUp $isShowingMessage={isShowingFriendRequestPopUp}>
          Solicitação Enviada
        </FriendRequestPopUp>
        {areNotificationsOpen ? (
          <MdCircleNotifications
            size={32}
            onClick={() => {
              console.log('ple')
              handleNotificationClick(false);
            }}
            className="notifications-button-home-screen"
          />
        ) : listaNotifications.length > 0 ? (
          <MdNotificationImportant
            size={32}
            onClick={() => {
              console.log('mig')
              handleNotificationClick(true);
            }}
            className="notifications-button-home-screen"
          />
        ) : (
          <IoIosNotifications
            size={32}
            onClick={() => {
              setAreNotificationsOpen(true);
              setTimeout(() => {
                setIsShowingNotificationsComponents(true);
              }, 350);
            }}
            className="notifications-button-home-screen"
          />
        )}

        <NotificacaoTab $isShowingNotificationsTab={areNotificationsOpen}>
          {areNotificationsOpen ? <h3>Notificações</h3> : null}
          <div className="notificacoes-conteudo">
            {isLoadingNotificationsSection ? (
              areNotificationsOpen ? (
                <FriendSectionLoader />
              ) : (
                ""
              )
            ) : isShowingNotificationsComponents ? (
              listaNotifications
            ) : (
              ""
            )}
          </div>
        </NotificacaoTab>
        <section className="main-post-feed">
          <div
            className={`search-bar`}
          >
            <div className="search-bar-positions">
              <input
                type="search"
                name="search-bar"
                placeholder="Pesquise um post aqui..."
              />
              <FaSearch className="search-lupa-home" color="white" />
            </div>
          </div>
          <div className="criar-novo-post" onClick={() => {
            console.log(isShowingNewPostPanel)
            openNewPostScreen()
          }}>
            Novo Post
          </div>

          <div style={{ marginTop: 64 }} className="separador-home-categorias-reviews"><h3>Reviews da Comunidade</h3></div>
          <section className="categoria-posts-amigos">
            {listaPostsAmigos}
          </section>
        </section>
        <section className="main-friends-section">
          <div
            className={`list-friends-parent ${isAddingFriends ? "hiding" : ""}`}
          >
            <div className={`link-card-main-friends`}>
              <h5>Amigos</h5>
              <IoPersonAdd
                onClick={() => setIsAddingFriends(!isAddingFriends)}
                style={iconStyle}
                size={24}
                className="adicionar-novo-amigo"
              />
            </div>
            <div className="amigos-display">
              {isLoadingFriendSection ? <FriendSectionLoader /> : listaAmigos}
            </div>
          </div>
          <AddUsersList $addUserListEnabled={isAddingFriends}>
            <div className="link-card-main-friends">
              <h5>Adicionar</h5>
              <IoIosCloseCircle
                onClick={() => setIsAddingFriends(!isAddingFriends)}
                style={iconStyle}
                size={24}
                className="adicionar-novo-amigo"
              />
            </div>
            <div className="user-display">{listaUsuarios}</div>
          </AddUsersList>
        </section>
      </div>
    </>
  );
}

export default HomeScreen;
