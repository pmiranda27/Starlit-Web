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
import { TabSelectArrow } from "../Components/Tab_Select_Arrow";

const HomePage = () => {
  const iconStyle = { color: "white" };

  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);
  const [searchBarEnabled, setSearchBarEnabled] = useState(true);

  const pages = [<HomeScreen />, <Chat />, <Profile />];

  return (
    <>
      <div className="home-main">
        <div
          className={`search-bar ${
            searchBarEnabled ? "" : "search-bar-invisible"
          }`}
        >
          <div className="search-bar-positions">
            <input
              type="search"
              name="search-bar"
              placeholder="Pesquise um post aqui..."
            />
            <img src={lupa} />
          </div>
        </div>
        <section className="section-abas">
          <div className="logo">
            <img height="60%" src={startlitLogo} />
          </div>
          <div className="navigation-left-bar">
            <TabSelectArrow $tabIndex={tabIndex} />
            <div
              className={tabIndex===0 ? `link-card-home-page link-card-selected` : `link-card-home-page`}
              onClick={() => {
                setSearchBarEnabled(true);
                setTabIndex(0);
              }}
            >
              <GoHomeFill style={iconStyle} />
              Home
            </div>
            <div
              className={tabIndex===1 ? `link-card-home-page link-card-selected` : `link-card-home-page`}
              onClick={() => {
                setSearchBarEnabled(false);
                setTabIndex(1);
              }}
            >
              <IoChatboxEllipsesSharp style={iconStyle} />
              Mensagens
            </div>
            <div
              className={tabIndex===2 ? `link-card-home-page link-card-selected` : `link-card-home-page`}
              onClick={() => {
                setSearchBarEnabled(false);
                setTabIndex(2);
              }}
            >
              <IoPerson style={iconStyle} />
              Perfil
            </div>
            <div
              className={tabIndex===3 ? `link-card-home-page bottom-card link-card-selected` : `link-card-home-page bottom-card`}
              onClick={() => setTabIndex(3)}
            >
              <IoSettings size={34} color="white" />
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
