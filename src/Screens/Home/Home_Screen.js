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
import { useAuth } from "../../Components/Services/Api_Service";


function HomeScreen() {
  const { getCredentials } = useAuth();

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

  const [credentialsHomeScreen, setCredentialsHomeScreen] = useState({});


  
  function setCredHome(){
    var credent = getCredentials();
    if (credent && credent !== credentialsHomeScreen) {
      setCredentialsHomeScreen(credent);
    }
  }

  useEffect(() => {
    if(!credentialsHomeScreen){
      setCredHome();
    }
    const refreshInterval = setInterval(() => {
      refreshEverythingUserHas();
    }, 5000);

    async function getFriendsList() {
      var getFriendListTries = 0;

      while (getFriendListTries <= 5) {
        if (!credentialsHomeScreen) {
          const credent = getCredentials();
          if (credent && credent !== credentialsHomeScreen) {
            setCredentialsHomeScreen(credent);
          }
          continue;
        }
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/amigos`, {
            email: credentialsHomeScreen['email'],
          });

          const newFriendsElements = response.data.map((friend, ind) => (
            <AmigoComponent
              key={friend.email}
              name={friend.name}
              imgUrl={friend.avatar}
              userEmail={credentialsHomeScreen['email']}
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
          getFriendListTries++;
          if (getFriendListTries > 5) {
            console.error("Max retries reached for fetching friends.");
            break;
          }
        }
        
      }
    }

    async function getAllUsersToAdd() {
      var getAllUsersToAddTries = 0;

      while (getAllUsersToAddTries <= 5) {
        if (!credentialsHomeScreen) {
          const credent = getCredentials();
          if (credent && credent !== credentialsHomeScreen) {
            setCredentialsHomeScreen(credent);
          }
        }
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/lista-usuarios`);
          const listaUsuariosFiltrada = response.data.filter(
            (user) => user.email !== credentialsHomeScreen['email']
          );

          const listaAmigos = await axios.post(`${process.env.REACT_APP_API_URL}/user/amigos`, {
            email: credentialsHomeScreen['email'],
          });

          const listaUsuariosFiltradaFinal = listaUsuariosFiltrada.filter(
            (user) => !listaAmigos.data.some((amigo) => amigo.email === user.email)
          );

          const newUsuariosElements = listaUsuariosFiltradaFinal.map(
            (user, ind) => (
              <UserComponent
                key={user.email}
                name={user.name}
                loggedUserName={getCredentials()['email']}
                userEmail={user.email}
                loggedUserEmail={getCredentials()['email']}
                imgUrl={user.avatar}
                setIsShowingFriendRequestPopUp={setIsShowingFriendRequestPopUp}
                refreshFriendsList={getFriendsList} // Passa a função para o UserComponent
                isFriendRequested={user.friendRequests.some((friendRequestUser) => friendRequestUser.sender === getCredentials()['email'])}
              />
            )
          );

          setListaUsuarios(newUsuariosElements);
        } catch (error) {
          console.error(
            "Erro ao obter lista de usuários:",
            error.response?.data || error.message
          );
          getAllUsersToAddTries++;
        }
      }
    }

    const getUserNotifications = async () => {
      var getUserNotificationsTries = 0;

      while (getUserNotificationsTries <= 5) {
        if (!credentialsHomeScreen) {
          const credent = getCredentials();
          if (credent && credent !== credentialsHomeScreen) {
            setCredentialsHomeScreen(credent);
          }
          continue;
        }
        try {
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/lista-notificacoes`, {
            email: credentialsHomeScreen['email'],
          });

          const newNotificationsElements = response.data.map(
            (notification, ind) => (
              <NotificacaoComponent
                key={ind}
                notificationId={notification._id}
                name={notification.name}
                avatar={notification.avatar}
                userEmail={credentialsHomeScreen['email']}
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
          getUserNotificationsTries++;
        }
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

    return () => clearInterval(refreshInterval);
  }, [credentialsHomeScreen]);

  const iconStyle = { color: "white" };

  const [isAddingFriends, setIsAddingFriends] = useState(false);

  const handleNotificationClick = (action) => {
    if(action){
      setAreNotificationsOpen(true);
      setTimeout(() => {
        setIsShowingNotificationsComponents(true);
      }, 350);
    }else {
      setAreNotificationsOpen(false);
      setTimeout(() => {
        setIsShowingNotificationsComponents(false);
      }, 350);
    }
  };
  

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
              handleNotificationClick(true)
            }}
            className="notifications-button-home-screen"
          />
        ) : listaNotifications.length > 0 ? (
          <MdNotificationImportant
            size={32}
            onClick={() => {
              handleNotificationClick(false)
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
        <section className="main-post-feed"></section>
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
