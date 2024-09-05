import "./Login.css";

import { Loader } from "../Components/Loader";

import axios from "axios";

import React from "react";
import { useNavigate } from "react-router-dom";
import PopUpConfirm from "../Components/PopUpConfirm";

const Login = () => {
  const apiUrl =
    "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

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
  const [confirmarInputError, setConfirmarInputError] = React.useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = React.useState(false);
  const [senhaErrorMessage, setSenhaErrorMessage] = React.useState(false);

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
        setEmailErrorMessage(false);
        break;
      case "senha":
        setSenhaInputError(false);
        setSenhaErrorMessage(false);
        break;
    }
  }

  function validateForm(e) {
    e.preventDefault();

    if (formBody.email == "" || !validateEmail(formBody.email)) {
      setEmailInputError(true);
      setEmailErrorMessage(true);
      formBody.email = "";

      validationFailed = true;

      console.log("Email inválido");
    }
    if (formBody.senha == "" || formBody.senha.length < 8) {
      setSenhaInputError(true);
      setSenhaErrorMessage(true);
      formBody.senha = "";

      validationFailed = true;

      console.log("Senha inválida");
    }

    if (validationFailed) {
      validationFailed = false;
      return;
    }

    const loginUser = {
      email: formBody.email,
      password: formBody.senha,
    };

    setIsLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(`${apiUrl}/user/login`, loginUser);
        if (response.status === 200) {
          console.log("sucesso no login");

          setIsLoading(false);
          setIsGreen(true);
          setIsShowingMessage(true);

          localStorage.setItem('token', response.data.token);

          setTimeout(() => {
            navigate("/home");
          }, 2000);
        }
      } catch (error) {
        setIsGreen(false);
        setIsShowingMessage(true);

        setTimeout(() => {
          setIsGreen(false);
          setIsShowingMessage(false);

          formBody.email = "";
          formBody.senha = "";

          setIsLoading(false);
        }, 3000);
        console.log("error: ", error);
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
