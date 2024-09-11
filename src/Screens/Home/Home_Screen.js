import "./Home_Screen.css";

import axios from "axios";
import axiosRetry from "axios-retry";

import { useState } from "react";

import AmigoComponent from "../../Components/Friends/Amigo_Component";
import UserComponent from "../../Components/Friends/User_Component";
import NotificacaoComponent from "../../Components/Notifications/Notificacao";

import { useEffect } from "react";
import { IoPersonAdd } from "react-icons/io5";
import AddUsersList from "../../Components/Friends/Add_Users_List";

import { MdCircleNotifications } from "react-icons/md";
import { MdNotificationImportant } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FriendSectionLoader } from "../../Components/Loaders/Friends_Section";
import { FriendRequestPopUp } from "../../Components/PopUpConfirm";

const apiUrl =
  "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

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

  const getCredentials = async () => {
    const creds = await verifyAuthentication();
    setCredentials(creds);
  };

  axiosRetry(axios, { retries: 5 });

  async function verifyAuthentication() {
    var verifyAuthenticationTries = 0;
    try {
      const isLoggedRequest = await axios.post(
        `${apiUrl}/user/verify-auth`,
        {
          loggedToken,
        },
        {
          timeout: 1250,
        }
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
    const response = await axios.post(`${apiUrl}/user/amigos`, {
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
  }

  async function getAllUsersToAdd() {
    const response = await axios.get(`${apiUrl}/user/lista-usuarios`);
    
    const listaUsuariosFiltrada = response.data.filter(
      (user) => user.email !== credentials.email
    );

    const listaAmigos = await axios.post(`${apiUrl}/user/amigos`, {
      email: credentials.email,
    });

    console.log('listaamigos: ', listaAmigos);

    const listaUsuariosFiltradaFinal = listaUsuariosFiltrada.filter(
      (user) => {
        return !listaAmigos.data.some((amigo) => amigo.email === user.email)
      }
    );
    
    const newUsuariosElements = listaUsuariosFiltradaFinal.map((user, ind) => (
      <UserComponent
        key={ind}
        name={user.name}
        loggedUserName={credentials.name}
        userEmail={user.email}
        loggedUserEmail={credentials.email}
        imgUrl={user.avatar}
        setIsShowingFriendRequestPopUp={setIsShowingFriendRequestPopUp}
      />
    ));

    setListaUsuarios(newUsuariosElements);
  }

  const getUserNotifications = async () => {
    const response = await axios.post(`${apiUrl}/user/lista-notificacoes`, {
      email: credentials.email,
    });

    const newNotificationsElements = response.data.map((notification, ind) => (
      <NotificacaoComponent
        key={ind}
        notificationId={notification._id}
        name={notification.name}
        avatar={notification.avatar}
        userEmail={credentials.email}
        onNotificationAnswered={refreshEverythingUserHas}
      />
    ));

    setListaNotifications(newNotificationsElements);
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
              setAreNotificationsOpen(false);
            }}
            className="notifications-button-home-screen"
          />
        ) : listaNotifications.length > 0 ? (
          <MdNotificationImportant
            size={32}
            onClick={() => {
              setAreNotificationsOpen(true);
            }}
            className="notifications-button-home-screen"
          />
        ) : (
          <IoIosNotifications
            size={32}
            onClick={() => {
              setAreNotificationsOpen(true);
            }}
            className="notifications-button-home-screen"
          />
        )}
        <div
          className={`notifications-tab-section ${
            areNotificationsOpen ? `` : `notifications-disabled`
          }`}
        >
          {isLoadingNotificationsSection ? (
            <FriendSectionLoader />
          ) : (
            listaNotifications
          )}
        </div>
        <section className="main-post-feed"></section>
        <section className="main-friends-section">
          <div className="link-card-main-friends">
            Amigos
            <IoPersonAdd
              onClick={() => {
                isAddingFriends
                  ? setIsAddingFriends(false)
                  : setIsAddingFriends(true);
              }}
              style={iconStyle}
              className="adicionar-novo-amigo"
            />
          </div>
          <div className="amigos-display">
            {isLoadingFriendSection ? (
              <FriendSectionLoader />
            ) : isAddingFriends ? (
              isLoadingAllUsersSection ? (
                <FriendSectionLoader />
              ) : (
                <AddUsersList>{listaUsuarios}</AddUsersList>
              )
            ) : (
              listaAmigos
            )}
          </div>
        </section>
      </div>
    </>
  );
}

export default HomeScreen;
