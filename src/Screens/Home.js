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

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TabSelectArrow } from "../Components/Tab_Select_Arrow";

const HomePage = () => {
  const apiUrl =
    "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

  const iconStyle = { color: "white" };

  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);
  const [searchBarEnabled, setSearchBarEnabled] = useState(true);

  const pages = [<HomeScreen />, <Chat />, <Profile />];

  const loggedToken = localStorage.getItem("token");

  // CHECANDO SE ESTÁ LOGADO!

  async function verifyAuthentication() {
    try {
      const isLoggedRequest = await axios.post(`${apiUrl}/user/verify-auth`, {
        loggedToken,
      });
      console.log("está logado. StatusCode: ", isLoggedRequest.status);

    } catch (error) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }

  useEffect(() => {
    verifyAuthentication();
  });

  return (
    <>
      <div className="home-main">
        <div
          className={`search-bar ${searchBarEnabled ? "" : "search-bar-invisible"
            }`}
        >
          <div className="search-bar-positions">
            <input
              type="search"
              name="search-bar"
              placeholder="Pesquise um post aqui..."
            />
            <img src={lupa} alt="" />
          </div>
        </div>
        <section className="section-abas">
          <div className="logo">
            <img height="60%" src={startlitLogo} alt="" />
          </div>
          <div className="navigation-left-bar">
            <TabSelectArrow $tabIndex={tabIndex} />
            <div
              className={
                tabIndex === 0
                  ? `link-card-home-page link-card-selected`
                  : `link-card-home-page`
              }
              onClick={() => {
                setSearchBarEnabled(true);
                setTabIndex(0);
              }}
            >
              <GoHomeFill style={iconStyle} />
              Home
            </div>
            <div
              className={
                tabIndex === 1
                  ? `link-card-home-page link-card-selected`
                  : `link-card-home-page`
              }
              onClick={() => {
                setSearchBarEnabled(false);
                setTabIndex(1);
              }}
            >
              <IoChatboxEllipsesSharp style={iconStyle} />
              Mensagens
            </div>
            <div
              className={
                tabIndex === 2
                  ? `link-card-home-page link-card-selected`
                  : `link-card-home-page`
              }
              onClick={() => {
                setSearchBarEnabled(false);
                setTabIndex(2);
              }}
            >
              <IoPerson style={iconStyle} />
              Perfil
            </div>
            <div
              className={
                tabIndex === 3
                  ? `link-card-home-page bottom-card link-card-selected`
                  : `link-card-home-page bottom-card`
              }
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
