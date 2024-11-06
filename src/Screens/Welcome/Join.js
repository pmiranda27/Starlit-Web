import "./Join.css";
import starlitLogo from "../../Assets/Images/starlit-logo.png";

import wave_one from "../../Assets/Svg/Welcome/wave1.svg"
import wave_two from "../../Assets/Svg/Welcome/wave2.svg"

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Join = () => {
  const [isHoveringOverButtonRegister, setIsHoveringOverButtonRegister] = useState(false);
  const [isHoveringOverButtonLogin, setIsHoveringOverButtonLogin] = useState(false);

  const [isAnimatedJoin, setIsAnimatedJoin] = useState(false);

  useEffect(() => {
    setIsAnimatedJoin(true);
  }, []);

  return (
    <div className="join-main">
      <img className={`wave-background-one ${isAnimatedJoin ? 'wave-outside-screen-one' : ''}`} src={wave_two} alt="wave two" />
      <img className={`wave-background-two ${isAnimatedJoin ? 'wave-outside-screen-two' : ''}`} src={wave_one} alt="wave one" />
      <div className={`join-painel ${isAnimatedJoin ? 'join-scale-in' : ''}`}>
        <img src={starlitLogo} alt="Logo Starlit" className="star-logo" />
        <h2>Bem-vindo(a)</h2>
        <div className="escolher-entrada">
          <div className="button-div">
            <h3>Primeira vez aqui?</h3>
            <Link className={`botao registrar-botao ${isHoveringOverButtonRegister ? `hovering-over-button-join` : ``}`} onMouseOver={() => {
              setIsHoveringOverButtonRegister(true);
            }} onMouseLeave={() => {
              setIsHoveringOverButtonRegister(false);
            }} to="/register">
              <span>Registrar</span>
            </Link>
          </div>
          <div className="button-div">
            <h3>Já possui uma conta?</h3>
            <Link className={`botao logar-botao ${isHoveringOverButtonLogin ? `hovering-over-button-join` : ''}`} onMouseOver={() => {
              setIsHoveringOverButtonLogin(true);
            }} onMouseLeave={() => {
              setIsHoveringOverButtonLogin(false);
            }} to="/login">
              <span>Logar</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;
