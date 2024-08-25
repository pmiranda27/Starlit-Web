import "./Register.css";
import starlitLogo from "../Assets/Images/starlit-logo.png";
import React, { useEffect } from "react";
import InputInvalidError from "../Components/Form_Validators";

import axios from "axios";

const Register = () => {
  const apiUrl = "https://def5f95f-e30e-4f86-b1e0-9f53460f5248-00-1pjmbawk5ifrf.worf.replit.dev";

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

  let validationFailed = false;

  async function validateForm(e) {
    e.preventDefault();

    if (formBody.nome == "" || formBody.nome.replace(/\s/g, "") == "") {
      setNomeInputError(true);
      setNomeErrorMessage(true);
      formBody.nome = "";

      validationFailed = true;

      console.log("Nome inválido");
    }
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

    const newUser = {
      name: formBody.nome,
      email: formBody.email,
      password: formBody.senha
    }
    
    try {
      const response = await axios.post(`${apiUrl}/register`, newUser);
      console.log("O status code da resposta é: ", response.status);
    } catch (error) {
      console.log('error: ', error)
    }
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
      }
    }


  return (
    <div className="register-main">
      <img src={starlitLogo} alt="Starlit Logo" className="starlit-logo" />
      <form
        className="form"
        id="form-register"
        onSubmit={validateForm}
        noValidate
      >
        <div className="input-section">
          <input
            type="text"
            name="nome"
            id="nome-form"
            value={formBody.nome}
            onChange={formHandler}
            className={
              nomeInputError
                ? "input-padrao input-padrao-invalido"
                : "input-padrao"
            }
            placeholder="Nome"
            onFocus={() => removeError("nome")}
          />
          <InputInvalidError $isVisible={nomeErrorMessage} id="nome-error">
            Nome inválido
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

        <input type="submit" className="input-submit" value="Registrar" />
      </form>
    </div>
  );
};

export default Register;
