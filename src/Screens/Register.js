import "./Register.css";
import React from "react";
import InputInvalidError from "../Components/Form_Validators";

import { Loader } from "../Components/Loader";
import ShootingStars from "../Components/Shooting_Stars";

import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUpConfirm from "../Components/PopUpConfirm";

const Register = () => {
  const apiUrl =
    "https://def5f95f-e30e-4f86-b1e0-9f53460f5248-00-1pjmbawk5ifrf.worf.replit.dev";

  const navigate = useNavigate();
  const ToLogin = () => {
    navigate("/login");
  };

  const [formBody, setFormBody] = React.useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const formHandler = (e) => {
    let nome = e.target.name;
    let valor = e.target.value;

    setFormBody({ ...formBody, [nome]: valor });
  };

  const [nomeInputError, setNomeInputError] = React.useState(false);
  const [emailInputError, setEmailInputError] = React.useState(false);
  const [senhaInputError, setSenhaInputError] = React.useState(false);
  const [confirmarInputError, setConfirmarInputError] = React.useState(false);

  const [nomeErrorMessage, setNomeErrorMessage] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState(false);
  const [senhaErrorMessage, setSenhaErrorMessage] = React.useState(false);
  const [confirmarErrorMessage, setConfirmarErrorMessage] =
    React.useState(false);

  const validateEmail = (email) => {
    return email.match(/^\S+@\S+\.\S+$/);
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [isGreen, setIsGreen] = React.useState(false);
  const [isShowingMessage, setIsShowingMessage] = React.useState(false);

  let validationFailed = false;

  async function validateForm(e) {
    e.preventDefault();

    if (formBody.nome === "" || formBody.nome.replace(/\s/g, "") === "") {
      setNomeInputError(true);
      setNomeErrorMessage(true);
      formBody.nome = "";

      validationFailed = true;

      console.log("Nome inválido");
    }
    if (formBody.email === "" || !validateEmail(formBody.email)) {
      setEmailInputError(true);
      setEmailErrorMessage(true);
      formBody.email = "";

      validationFailed = true;

      console.log("Email inválido");
    }
    if (formBody.senha === "" || formBody.senha.length < 8) {
      setSenhaInputError(true);
      setSenhaErrorMessage(true);
      formBody.senha = "";

      validationFailed = true;

      console.log("Senha inválida");
    }
    if (
      formBody.confirmarSenha === "" ||
      formBody.confirmarSenha !== formBody.senha
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

    const newUser = {
      name: formBody.nome,
      email: formBody.email,
      password: formBody.senha,
    };

    setIsLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(`${apiUrl}/register`, newUser);
        if (response.status === 201) {
          setIsLoading(false);
          setIsGreen(true);
          setIsShowingMessage(true);

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
        console.log("O status code da resposta é: ", response.status);
      } catch (error) {
        setIsGreen(false);
        setIsShowingMessage(true);

        setTimeout(() => {
          setIsGreen(false);
          setIsShowingMessage(false);

          formBody.nome = "";
          formBody.email = "";
          formBody.senha = "";
          formBody.confirmarSenha = "";

          setIsLoading(false);
        }, 3000);
        console.log("error: ", error);
      }
    }, 1500);
  }

  function removeError(input) {
    switch (input) {
      case "nome":
        setNomeInputError(false);
        setNomeErrorMessage(false);
        break;
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
      default:
        break;
    }
  }

  return (
    <>
      <ShootingStars />
      <div className="register-main">
        <PopUpConfirm $isGreen={isGreen} $isShowingMessage={isShowingMessage}>
          {isGreen
            ? `Registro realizado com sucesso. Redirecionando...`
            : `Falha no registro.`}
        </PopUpConfirm>
        <form
          className="form-register"
          id="form-register"
          onSubmit={validateForm}
          noValidate
        >
          <h3 className="register-title">Registro</h3>
          <div className="input-section">
            <input
              type="text"
              name="nome"
              id="nome-form"
              value={formBody.nome}
              onChange={formHandler}
              className={
                nomeInputError
                  ? "input-padrao-register input-padrao-invalido-register"
                  : "input-padrao-register"
              }
              placeholder="Nome"
              onFocus={() => removeError("nome")}
            />
            <InputInvalidError $isVisible={nomeErrorMessage} id="nome-error">
              Por favor, insira um nome válido.
            </InputInvalidError>
          </div>

          <div className="input-section">
            <input
              type="email"
              name="email"
              id="email-form"
              value={formBody.email}
              onChange={formHandler}
              className={
                emailInputError
                  ? "input-padrao-register input-padrao-invalido-register"
                  : "input-padrao-register"
              }
              onFocus={() => removeError("email")}
              placeholder="Email"
            />
            <InputInvalidError $isVisible={emailErrorMessage} id="email-error">
              Por favor, insira um nome válido.
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
                  ? "input-padrao-register input-senha-media-register input-padrao-invalido-register"
                  : "input-padrao-register input-senha-media-register"
              }
              onFocus={() => removeError("senha")}
              placeholder="Senha"
            />
            <InputInvalidError $isVisible={senhaErrorMessage} id="senha-error">
              Por favor, insira uma senha com no mínimo 8 caracteres.
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
                  ? "input-padrao-register input-padrao-invalido-register"
                  : "input-padrao-register"
              }
              onFocus={() => removeError("confirmarSenha")}
              placeholder="Confirmar senha"
            />
            <InputInvalidError
              $isVisible={confirmarErrorMessage}
              id="confirmar-error"
            >
              Senhas discrepantes.
            </InputInvalidError>
          </div>

          <button type="submit" className="input-submit-register">
            {isLoading ? <Loader /> : "Registrar"}
          </button>
          <p>
            Já possui uma conta?{" "}
            <span onClick={ToLogin} className="span-login">
              Faça Login!
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
