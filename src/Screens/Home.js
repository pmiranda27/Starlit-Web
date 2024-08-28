import ShootingStars from "../Components/Shooting_Stars";
import startlitLogo from "../Assets/Images/starlit-logo.png";
import lupa from "../Assets/Images/lupa.png";

import { GoHomeFill } from "react-icons/go";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";

import "./Home.css";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const iconStyle = { color: "white" };

  const navigate = useNavigate();

  async function changeTab(index) {
    switch (index) {
      case 0:
        break;
      case 1:
        setTimeout(() => {
          navigate("/message");
        }, 100);
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  return (
    <div className="home-main">
      <ShootingStars />
      <div className="search-bar">
        <div className="search-bar-positions">
          <input type="search" name="search-bar" />
          <img src={lupa} />
        </div>
      </div>
      <section className="section-abas">
        <div className="logo">
          <img height="80%" src={startlitLogo} />
        </div>
        <div className="navigation-left-bar">
          <div className="link-card-home" onClick={changeTab(0)}>
            <GoHomeFill style={iconStyle} />
            Home
          </div>
          <div className="link-card-home" onClick={changeTab(1)}>
            <IoChatboxEllipsesSharp style={iconStyle} />
            Mensagens
          </div>
          <div className="link-card-home" onClick={changeTab(2)}>
            <IoPerson style={iconStyle} />
            Perfil
          </div>
          <div className="link-card-home bottom-card" onClick={changeTab(3)}>
            <IoSettings style={iconStyle} />
            Configurações
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
