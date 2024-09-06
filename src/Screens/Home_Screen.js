import axios from "axios";
import "./Home_Screen.css";

import { useState } from "react";

import AmigoComponent from "../Components/Amigo_Component";
import UserComponent from "../Components/User_Component";

import { useEffect } from "react";
import { IoPersonAdd } from "react-icons/io5";
import AddUsersList from "../Components/Add_Users_List";

const apiUrl =
  "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

const loggedToken = localStorage.getItem("token");

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

function HomeScreen() {
  const [listaAmigos, setListaAmigos] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    getFriendsList(setListaAmigos);
  }, []);
  useEffect(() => {
    getAllUsersToAdd(setListaUsuarios);
  }, []);

  const iconStyle = { color: "white" };

  const [isAddingFriends, setIsAddingFriends] = useState(false);

  return (
    <>
      <div className="home-screen-main">
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
            {isAddingFriends ? (
              <AddUsersList>{listaUsuarios}</AddUsersList>
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
