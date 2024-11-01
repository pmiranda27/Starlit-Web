import startlitLogo from "../../Assets/Images/starlit-logo.png";
import lupa from "../../Assets/Images/lupa.png";

import { GoHomeFill } from "react-icons/go";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";

import "./Home.css";

import HomeScreen from "./Home_Screen";
import Chat from "../Chats/Message";
import Profile from "../Profile/Profile";

import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TabSelectArrow } from "../../Components/Tab_Select_Arrow";
import { ApiService } from "../../Components/Services/Api_Service";
import { IoIosSettings } from "react-icons/io";

const HomePage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

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
          className={`search-bar ${searchBarEnabled ? "" : "search-bar-hidden"
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
          <div className={`logo ${searchBarEnabled ? "logo-search-bar" : ""}`}>
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
              Mensag.
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
                  ? `link-card-home-page link-card-selected`
                  : `link-card-home-page`
              }
              onClick={() => {
                setSearchBarEnabled(false);
                setTabIndex(3)
              }
              }
            >
              <IoIosSettings color="white" />
              Config.
            </div>
          </div>
        </section>
        <section className="main-conteudo">{pages[tabIndex]}</section>
      </div>
    </>
  );
};

export default HomePage;
