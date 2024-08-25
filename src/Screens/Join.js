import "./Join.css";
import starlitLogo from "../Assets/Images/starlit-logo.png";
import { Link } from "react-router-dom";

import ShootingStars from "../Components/Shooting_Stars.js";

const Join = () => {
  return (
    <div className="join-main">
      <ShootingStars />
      <div className="join-painel">
        <img src={starlitLogo} alt="Logo Starlit" className="star-logo" />
        <h2>Bem-vindo(a)</h2>
        <div className="escolher-entrada">
          <div className="button-div">
            <h3>Primeira vez aqui?</h3>
            <Link className="botao" to="/registrar">
              <span>Registrar</span>
            </Link>
          </div>
          <div className="button-div">
            <h3>Já possui uma conta?</h3>
            <Link className="botao" to="/logar">
              <span>Logar</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
