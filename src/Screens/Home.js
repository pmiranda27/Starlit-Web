import ShootingStars from "../Components/Shooting_Stars";
import startlitLogo from "../Assets/Images/starlit-logo.png";
import lupa from "../Assets/Images/lupa.png";

import { GoHomeFill } from "react-icons/go";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";

import "./Home.css";

import HomeScreen from "./Home_Screen";
import Chat from "./Message";
import Profile from "./Profile";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HomePage = () => {
  const iconStyle = { color: "white" };

  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);
  const [searchBarEnabled, setSearchBarEnabled] = useState(true);

  const pages = [
    <HomeScreen />,
    <Chat />,
    <Profile />
  ];

  return (
    <>
      <ShootingStars />
      <div className="home-main">
        <div className={`search-bar ${searchBarEnabled ? '' : 'search-bar-invisible'}`}>
          <div className='search-bar-positions'>
            <input type="search" name="search-bar" placeholder="Pesquise um post aqui..." />
            <img src={lupa} />
          </div>
        </div>
        <section className="section-abas">
          <div className="logo">
            <img height="80%" src={startlitLogo} />
          </div>
          <div className="navigation-left-bar">
            <div className="link-card-home" onClick={() => {
              setSearchBarEnabled(true);
              setTabIndex(0);
            }}>
              <GoHomeFill style={iconStyle} />
              Home
            </div>
            <div className="link-card-home" onClick={() => {
              setSearchBarEnabled(false);
              setTabIndex(1);
            }}>
              <IoChatboxEllipsesSharp style={iconStyle} />
              Mensagens
            </div>
            <div className="link-card-home" onClick={() => {
              setSearchBarEnabled(false);
              setTabIndex(2);
            }}>
              <IoPerson style={iconStyle} />
              Perfil
            </div>
            <div
              className="link-card-home bottom-card"
              onClick={() => setTabIndex(3)}
            >
              <IoSettings style={iconStyle} />
              Configurações
            </div>
          </div>
        </section>
        <section className="main-conteudo">{pages[tabIndex]}</section>
      </div>
    </>
  );
};

export default HomePage;
