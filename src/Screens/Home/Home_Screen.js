import axios from "axios";
import "./Home_Screen.css";

import { useState } from "react";

import AmigoComponent from "../../Components/Friends/Amigo_Component";
import UserComponent from "../../Components/Friends/User_Component";

import { useEffect } from "react";
import { IoPersonAdd } from "react-icons/io5";
import AddUsersList from "../../Components/Friends/Add_Users_List";

import { MdCircleNotifications } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import NotificacaoComponent from "../../Components/Notifications/Notificacao";
import { FriendSectionLoader } from "../../Components/Loaders/Friends_Section";

const apiUrl =
  "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

var loggedToken = localStorage.getItem("token");

async function verifyAuthentication() {
  try {
    const isLoggedRequest = await axios.post(`${apiUrl}/user/verify-auth`, {
      loggedToken,
    });

    return isLoggedRequest.data.decode;
  } catch (error) {
    console.log(`error: ${error}`);
  }
}

const credentials = await verifyAuthentication();

function HomeScreen() {
  async function getFriendsList(setAmigos) {
    const response = await axios.post(`${apiUrl}/user/amigos`, {
      email: credentials.email,
    });
    const newFriendsElements = response.data.map((friend, ind) => (
      <AmigoComponent key={ind} name={friend.name} imgUrl={friend.avatar} />
    ));

    setAmigos(newFriendsElements);
  }

  async function getAllUsersToAdd(setUsuarios) {
    const response = await axios.get(`${apiUrl}/user/lista-usuarios`);

    const listaUsuariosFiltrada = response.data.filter(
      (user) => user.email !== credentials.email
    );

    const newUsuariosElements = listaUsuariosFiltrada.map((user, ind) => (
      <UserComponent key={ind} name={user.name} imgUrl={user.avatar} />
    ));

    setUsuarios(newUsuariosElements);
  }

  async function getUserNotifications(setLista) {
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
      />
    ));

    console.log('notifications: ', newNotificationsElements);

    setLista(newNotificationsElements);
  }

  const [listaAmigos, setListaAmigos] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaNotifications, setListaNotifications] = useState([]);

  const [areNotificationsOpen, setAreNotificationsOpen] = useState(false);
  const [isLoadingFriendSection, setIsLoadingFriendSection] = useState(true);
  const [isLoadingAllUsersSection, setIsLoadingAllUsersSection] =
    useState(true);
  const [isLoadingNotificationsSection, setIsLoadingNotificationsSection] =
    useState(true);

  useEffect(() => {
    getFriendsList(setListaAmigos);
    getAllUsersToAdd(setListaUsuarios);
    getUserNotifications(setListaNotifications);

    setTimeout(() => {
      setIsLoadingFriendSection(false);
      setIsLoadingNotificationsSection(false);
      setIsLoadingAllUsersSection(false);
    }, 1250);
  }, []);

  const iconStyle = { color: "white" };

  const [isAddingFriends, setIsAddingFriends] = useState(false);

  return (
    <>
      <div className="home-screen-main">
        {areNotificationsOpen ? (
          <MdCircleNotifications
            size={32}
            onClick={() => {
              setAreNotificationsOpen(false);
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
