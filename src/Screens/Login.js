import "./Login.css";

import starlitLogo from "../Assets/Images/starlit-logo.png";
import InputInvalidError from "../Components/Form_Validators";

import { Loader } from "../Components/Loader";

import axios from "axios";

import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const apiUrl =
    "https://def5f95f-e30e-4f86-b1e0-9f53460f5248-00-1pjmbawk5ifrf.worf.replit.dev";

  const navigate = useNavigate();

  const [formBody, setFormBody] = React.useState({
    email: "",
    senha: "",
    confirmarSenha: "",
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
  const [confirmarErrorMessage, setConfirmarErrorMessage] =
    React.useState(false);

  const validateEmail = (email) => {
    return email.match(/^\S+@\S+\.\S+$/);
  };

  const [isLoading, setIsLoading] = React.useState(false);

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
      case "confirmarSenha":
        setConfirmarInputError(false);
        setConfirmarErrorMessage(false);
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
    if (
      formBody.confirmarSenha == "" ||
      formBody.confirmarSenha != formBody.senha
    ) {
      setConfirmarInputError(true);
      setConfirmarErrorMessage(true);
      formBody.confirmarSenha = "";

      validationFailed = true;

      console.log("Confirmação de Senha inválida");
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
        const response = await axios.post(`${apiUrl}/login`, loginUser);
        if (response.status == 200) {
            console.log('sucesso no login')
            
            setIsLoading(false);
        }
          console.log("O status code da resposta é: ", response.status);
          console.log("O token da resposta é: ", response.data.token) 
      } catch (error) {
        console.log("error: ", error);
      }
    }, 1500);
  }

  return (
    <div className="login-main">
      <img src={starlitLogo} alt="Starlit Logo" className="starlit-logo" />
      <form
        className="form"
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
                ? "input-padrao input-padrao-invalido"
                : "input-padrao"
            }
            onFocus={() => removeError("email")}
            placeholder="Email"
          />
          <InputInvalidError $isVisible={emailErrorMessage} id="email-error">
            Email inválido
          </InputInvalidError>
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
                ? "input-padrao input-padrao-invalido"
                : "input-padrao"
            }
            onFocus={() => removeError("senha")}
            placeholder="Senha"
          />
          <InputInvalidError $isVisible={senhaErrorMessage} id="senha-error">
            Senha inválida, mínimo de 8 caracteres
          </InputInvalidError>
        </div>

        <div className="input-section">
          <input
            type="password"
            name="confirmarSenha"
            id="confirmar-form"
            value={formBody.confirmarSenha}
            onChange={formHandler}
            className={
              confirmarInputError
                ? "input-padrao input-padrao-invalido"
                : "input-padrao"
            }
            onFocus={() => removeError("confirmarSenha")}
            placeholder="Confirmar senha"
          />
          <InputInvalidError
            $isVisible={confirmarErrorMessage}
            id="confirmar-error"
          >
            Senhas discrepantes
          </InputInvalidError>
        </div>

        <button type="submit" className="input-submit">
          {isLoading ? <Loader /> : "Logar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
