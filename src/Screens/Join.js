import "./Join.css";
import starlitLogo from "../Assets/Images/starlit-logo.png"

const Join = () => {
    return (
        <div className="join-main">
            <div className="join-painel">
                <img src={starlitLogo} alt="Logo Starlit" className="star-logo" />
                <h2>Bem-vindo(a)</h2>
                <div className="button-div">
                    <h3>Primeira vez aqui?</h3>
                    <button className="botao">Registrar</button>
                </div>
                <div className="button-div">
                    <h3>Já possui uma conta?</h3>
                    <button className="botao">Logar</button>
                </div>
            </div>
        </div>
    );
}

export default Join;