import "./Login.css";

import { Loader } from "../../Components/Loaders/Loader_Welcome";


import React from "react";
import { useNavigate } from "react-router-dom";
import { PopUpConfirm } from "../../Components/PopUpConfirm";

import { useAuth } from "../../Components/Services/Api_Service";

const Login = () => {
  const { loginAccount } = useAuth();

  const navigate = useNavigate();
  const ToRegister = () => {
    navigate("/register");
  };

  const [formBody, setFormBody] = React.useState({
    email: "",
    senha: "",
  });

  const formHandler = (e) => {
    let nome = e.target.name;
    let valor = e.target.value;

    setFormBody({ ...formBody, [nome]: valor });
  };

  const [emailInputError, setEmailInputError] = React.useState(false);
  const [senhaInputError, setSenhaInputError] = React.useState(false);

  const validateEmail = (email) => {
    return email.match(/^\S+@\S+\.\S+$/);
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [isGreen, setIsGreen] = React.useState(false);
  const [isShowingMessage, setIsShowingMessage] = React.useState(false);

  let validationFailed = false;

  function removeError(input) {
    switch (input) {
      case "email":
        setEmailInputError(false);
        break;
      case "senha":
        setSenhaInputError(false);
        break;
      default:
        break;
    }
  }

  function validateForm(e) {
    e.preventDefault();

    if (formBody.email === "" || !validateEmail(formBody.email)) {
      setEmailInputError(true);
      formBody.email = "";

      validationFailed = true;

      console.log("Email inválido");
    }
    if (formBody.senha === "" || formBody.senha.length < 8) {
      setSenhaInputError(true);
      formBody.senha = "";

      validationFailed = true;

      console.log("Senha inválida");
    }

    if (validationFailed) {
      validationFailed = false;
      return;
    }

    const loginUser = {
      "email": formBody.email,
      "password": formBody.senha
    };

    setIsLoading(true);

    setTimeout(async () => {
      console.log('tentando logar')
      const loginTry = await loginAccount(loginUser);
      console.log('logado');
      if (loginTry.status === 200) {
        setIsLoading(false);
        setIsGreen(true);
        setIsShowingMessage(true);

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
      else {
        setIsGreen(false);
        setIsShowingMessage(true);

        setTimeout(() => {
          setIsGreen(false);
          setIsShowingMessage(false);

          formBody.email = "";
          formBody.senha = "";

          setIsLoading(false);
        }, 1750);
      }
    }, 1500);
  }

  return (
    <>
      <div className="login-main">
        <PopUpConfirm $isGreen={isGreen} $isShowingMessage={isShowingMessage}>
          {isGreen
            ? `Logado com sucesso. Redirecionando...`
            : `Falha no Login.`}
        </PopUpConfirm>
        <form
          className="form-login"
          id="form-register"
          onSubmit={validateForm}
          noValidate
        >
          <h3 className="login-title">Login</h3>

          <div className="input-section">
            <input
              type="email"
              name="email"
              id="email-form"
              value={formBody.email}
              onChange={formHandler}
              className={
                emailInputError
                  ? "input-padrao-login input-padrao-invalido"
                  : "input-padrao-login"
              }
              onFocus={() => removeError("email")}
              placeholder="Email"
            />
          </div>

          <div className="input-section">
            <input
              type="password"
              name="senha"
              id="senha-form"
              value={formBody.senha}
              onChange={formHandler}
              className={
                senhaInputError
                  ? "input-padrao-login input-padrao-invalido"
                  : "input-padrao-login"
              }
              onFocus={() => removeError("senha")}
              placeholder="Senha"
            />
          </div>

          <button type="submit" className="input-submit-login">
            {isLoading ? <Loader /> : "Logar"}
          </button>
          <p>
            Ainda não possui uma conta?{" "}
            <span onClick={ToRegister}>Registre-se!</span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
