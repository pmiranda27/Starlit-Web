import "./Home_Screen.css";
import axios from "axios";
import axiosRetry from "axios-retry";
import { useState, useEffect } from "react";

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
import { ApiService } from "../../Components/Services/Api_Service";


function HomeScreen() {
  const [credentials, setCredentials] = useState(null);
  const [loggedToken, setLoggedToken] = useState();

  const [listaAmigos, setListaAmigos] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaNotifications, setListaNotifications] = useState([]);

  const [isShowingFriendRequestPopUp, setIsShowingFriendRequestPopUp] =
    useState(false);
  const [areNotificationsOpen, setAreNotificationsOpen] = useState(false);
  const [isLoadingFriendSection, setIsLoadingFriendSection] = useState(true);
  const [isLoadingAllUsersSection, setIsLoadingAllUsersSection] =
    useState(true);
  const [isLoadingNotificationsSection, setIsLoadingNotificationsSection] =
    useState(true);

  const [
    isShowingNotificationsComponents,
    setIsShowingNotificationsComponents,
  ] = useState(false);

  axiosRetry(axios, { retries: 5 });

  const getCredentials = async () => {
    const creds = await verifyAuthentication();
    setCredentials(creds);
  };

  async function verifyAuthentication() {
    var verifyAuthenticationTries = 0;
    try {
      const isLoggedRequest = await axios.post(
        `${ApiService.apiUrl}/user/verify-auth`,
        { loggedToken },
        { timeout: 1250 }
      );

      return isLoggedRequest.data.decode;
    } catch (error) {
      console.log(`error: ${error}`);
      if (verifyAuthenticationTries > 3) {
        console.log("3 tentativas foram feitas, nenhuma funcionou!");
        verifyAuthenticationTries++;
      }
    }
  }

  async function getFriendsList() {
    try {
      const response = await axios.post(`${ApiService.apiUrl}/user/amigos`, {
        email: credentials.email,
      });

      const newFriendsElements = response.data.map((friend, ind) => (
        <AmigoComponent
          key={ind}
          name={friend.name}
          imgUrl={friend.avatar}
          userEmail={credentials.email}
          emailFriend={friend.email}
          refreshFriend={getFriendsList}
        />
      ));

      setListaAmigos(newFriendsElements);
    } catch (error) {
      console.error(
        "Erro ao obter lista de amigos:",
        error.response?.data || error.message
      );
    }
  }

  async function getAllUsersToAdd() {
    try {
      const response = await axios.get(`${ApiService.apiUrl}/user/lista-usuarios`);
      const listaUsuariosFiltrada = response.data.filter(
        (user) => user.email !== credentials.email
      );

      const listaAmigos = await axios.post(`${ApiService.apiUrl}/user/amigos`, {
        email: credentials.email,
      });

      const listaUsuariosFiltradaFinal = listaUsuariosFiltrada.filter(
        (user) => !listaAmigos.data.some((amigo) => amigo.email === user.email)
      );

      const newUsuariosElements = listaUsuariosFiltradaFinal.map(
        (user, ind) => (
          <UserComponent
            key={ind}
            name={user.name}
            loggedUserName={credentials.name}
            userEmail={user.email}
            loggedUserEmail={credentials.email}
            imgUrl={user.avatar}
            setIsShowingFriendRequestPopUp={setIsShowingFriendRequestPopUp}
            refreshFriendsList={getFriendsList} // Passa a função para o UserComponent
          />
        )
      );

      setListaUsuarios(newUsuariosElements);
    } catch (error) {
      console.error(
        "Erro ao obter lista de usuários:",
        error.response?.data || error.message
      );
    }
  }

  const getUserNotifications = async () => {
    try {
      const response = await axios.post(`${ApiService.apiUrl}/user/lista-notificacoes`, {
        email: credentials.email,
      });

      const newNotificationsElements = response.data.map(
        (notification, ind) => (
          <NotificacaoComponent
            key={ind}
            notificationId={notification._id}
            name={notification.name}
            avatar={notification.avatar}
            userEmail={credentials.email}
            onNotificationAnswered={refreshEverythingUserHas}
          />
        )
      );

      setListaNotifications(newNotificationsElements);
    } catch (error) {
      console.error(
        "Erro ao obter notificações:",
        error.response?.data || error.message
      );
    }
  };

  function refreshEverythingUserHas() {
    getUserNotifications();
    setIsLoadingAllUsersSection(false);

    getAllUsersToAdd();
    setIsLoadingNotificationsSection(false);

    getFriendsList();
    setIsLoadingFriendSection(false);
  }

  var checkCred = 0;

  useEffect(() => {
    if (!credentials) {
      console.log("sem credenciais");
      setLoggedToken(localStorage.getItem("token"));
      getCredentials();
      return;
    } else if (checkCred < 1) {
      checkCred++;
      console.log("com credenciais: ", credentials);
    }

    const refreshInterval = setInterval(() => {
      refreshEverythingUserHas();
    }, 2500);

    return () => clearInterval(refreshInterval);
  }, [credentials]);

  const iconStyle = { color: "white" };

  const [isAddingFriends, setIsAddingFriends] = useState(false);

  return (
    <>
      <div className="home-screen-main">
        <FriendRequestPopUp $isShowingMessage={isShowingFriendRequestPopUp}>
          Solicitação Enviada
        </FriendRequestPopUp>
        {areNotificationsOpen ? (
          <MdCircleNotifications
            size={32}
            onClick={() => {
              setIsShowingNotificationsComponents(false);
              setTimeout(setAreNotificationsOpen(false), 300);
            }}
            className="notifications-button-home-screen"
          />
        ) : listaNotifications.length > 0 ? (
          <MdNotificationImportant
            size={32}
            onClick={() => {
              setAreNotificationsOpen(true);
              setTimeout(() => { setIsShowingNotificationsComponents(true) }, 350);
            }}
            className="notifications-button-home-screen"
          />
        ) : (
          <IoIosNotifications
            size={32}
            onClick={() => {
              setAreNotificationsOpen(true);
              setTimeout(() => { setIsShowingNotificationsComponents(true) }, 350);
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
        <section className="main-post-feed"></section>
        <section className="main-friends-section">
          <div className={`list-friends-parent ${isAddingFriends ? 'hiding' : ''}`}>
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
              {isLoadingFriendSection ? (
                <FriendSectionLoader />
              ) :
                listaAmigos
              }
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
            <div className="user-display">
              {listaUsuarios}
            </div>
          </AddUsersList>
        </section>
      </div>
    </>
  );
}

export default HomeScreen;
