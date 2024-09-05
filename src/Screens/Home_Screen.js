import axios from "axios";
import "./Home_Screen.css";

import { useState } from "react";

import { FaUserFriends } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import AmigoComponent from "../Components/Amigo_Component";
import { useEffect } from "react";
import { IoPersonAdd } from "react-icons/io5";

const apiUrl =
  "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

  const email = "pedro@gmail.com";

async function getFriendsList(setAmigos) {
  const response = await axios.post(`${apiUrl}/user/amigos`, { email: email });
  const newFriendsElements = response.data.map((friend, ind) => <AmigoComponent key={ind} name={friend.name} imgUrl={friend.avatar} />);

  setAmigos(newFriendsElements);
}

async function getAllUsersToAdd(setUsuarios){
  const response = await axios.get(`${apiUrl}/user/lista-usuarios`);
  const newUsuariosElements = response.data.map((friend, ind) => {})

  setUsuarios(newUsuariosElements);
}


function HomeScreen() {
  const [listaAmigos, setListaAmigos] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  useEffect(() => { getFriendsList(setListaAmigos); }, [])
  useEffect(() => { getAllUsersToAdd(setListaUsuarios); }, [])

  const iconStyle = { color: "white" };

  const [isAddingFriends, setIsAddingFriends] = useState(false);


  return (
    <>
      <div className="home-screen-main">
        <section className="main-post-feed"></section>
        <section className="main-friends-section">
          <div className="link-card-main-friends">
            Amigos
            <IoPersonAdd style={iconStyle} className="adicionar-novo-amigo" />
          </div>
          {
            isAddingFriends ? "" : listaAmigos
          }
          <div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomeScreen;
