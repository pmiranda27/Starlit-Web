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
import { useAmigos } from "../../Components/Services/Amigos_Service";

function HomeScreen() {
  const { getCredentials } = useAuth();
  const { getListaAmigos, refreshCredenciaisAmigos, getAllUsersExceptLoggedUserAndFriends, getNotificacoesUsuario } = useAmigos();

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

  var credentialsHomeScreen;

  function setCredentialsHomeScreen(){
    credentialsHomeScreen = getCredentials();
  }

  async function getFriendsItemsList() {
    const friendList = await getListaAmigos()

    const listaComponentesAmigos = friendList.map((friend, ind) => (
      <AmigoComponent
        key={friend.email}
        name={friend.name}
        imgUrl={friend.avatar}
        userEmail={credentialsHomeScreen.email}
        emailFriend={friend.email}
        refreshFriend={getFriendsItemsList}
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
          name={user.name}
          loggedUserName={credentialsHomeScreen.email}
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

  useEffect(() => {
    if(!credentialsHomeScreen){
      setCredentialsHomeScreen();
    }
    console.log("Credenciais atuais: ", credentialsHomeScreen);

    refreshEverythingUserHas();

    const refreshInterval = setInterval(() => {
      refreshEverythingUserHas();
    }, 6500);

    return () => clearInterval(refreshInterval);
  }, [credentialsHomeScreen]);

  const iconStyle = { color: "white" };

  const [isAddingFriends, setIsAddingFriends] = useState(false);

  const handleNotificationClick = (action) => {
    if (action) {
      setAreNotificationsOpen(true);
      setTimeout(() => {
        setIsShowingNotificationsComponents(true);
      }, 350);
    } else {
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
              handleNotificationClick(true);
            }}
            className="notifications-button-home-screen"
          />
        ) : listaNotifications.length > 0 ? (
          <MdNotificationImportant
            size={32}
            onClick={() => {
              handleNotificationClick(false);
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
