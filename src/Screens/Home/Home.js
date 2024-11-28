import startlitLogo from "../../Assets/Images/starlit.png";

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
import { ApiService } from "../../Components/Services/Api_Service";
import { IoIosSettings } from "react-icons/io";
import { PopUpError } from "../../Components/PopUpError";

const HomePage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const iconStyle = { color: "white" };

  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);
  const [searchBarEnabled, setSearchBarEnabled] = useState(true);

  const [userNickname, setUserNickname] = useState();

  const [isShowingErrorMessage, setIsShowingErrorMessage] = useState(false);
  const [errorMessagePopUp, setErrorMessagePopUp] = useState('');

  const pages = [<HomeScreen goToProfilePage={goToProfile} />, <Chat />, <Profile nicknameToSearch={userNickname} />];

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

      if (sessionStorage.getItem('username')) {
        setErrorMessagePopUp('Falha na Autenticação. Por favor logue novamente!')
        setIsShowingErrorMessage(true);

        setTimeout(() => {
          setIsShowingErrorMessage(false);
          navigate('/');
        }, 2500)
      } else {
        navigate("/");
      }
    }
  }

  function goToProfile(username) {
    setUserNickname(username)

    setTabIndex(2);
  }

  useEffect(() => {
    verifyAuthentication();
  });

  return (
    <>
      <div className="home-main">
        <PopUpError $isShowingMessage={isShowingErrorMessage}>
          {errorMessagePopUp}
        </PopUpError>
        <section className="section-abas">
          <div className="navigation-left-bar">
            <div className={`logo ${searchBarEnabled ? "logo-search-bar" : ""}`}>
              <img width="60%" src={startlitLogo} alt="" />
            </div>
            <div className="separator-home-cards">
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
              </div>
              <div
                className={
                  tabIndex === 2
                    ? `link-card-home-page link-card-selected`
                    : `link-card-home-page`
                }
                onClick={() => {
                  setSearchBarEnabled(false);
                  goToProfile()
                }}
              >
                <IoPerson style={iconStyle} />
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
              </div>
            </div>
          </div>
        </section>
        <section className="main-conteudo">{pages[tabIndex]}</section>
      </div>
    </>
  );
};

export default HomePage;
