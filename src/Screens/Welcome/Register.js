import "./Register.css";
import React, { useState } from "react";

import { Loader } from "../../Components/Loaders/Loader_Welcome";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PopUpConfirm } from "../../Components/PopUpConfirm";

import { ImCross } from "react-icons/im";
import { SendProfilePicturePanel } from "../../Components/Send_Profile_Picture_Panel";
import { useAuth } from "../../Components/Services/Api_Service";
import { PopUpError } from "../../Components/PopUpError";


const Register = () => {
  const { registerAccount } = useAuth();

  const navigate = useNavigate();
  const ToLogin = () => {
    navigate("/login");
  };

  const [formBody, setFormBody] = useState({
    username: "",
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    avatar: "",
  });

  const [CanChangeRegisterInputs, setCanChangeRegisterInputs] =
    useState(true);
  const [isShowingProfilePicturePanel, setIsShowingProfilePicturePanel] =
    useState(false);

  const formHandler = (e) => {
    let nome = e.target.name;
    let valor = e.target.value;

    if (!CanChangeRegisterInputs && nome !== "avatar") {
      return;
    }

    setFormBody({ ...formBody, [nome]: valor });
  };

  const [usernameInputError, setUsernameInputError] = useState(false);
  const [nomeInputError, setNomeInputError] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [senhaInputError, setSenhaInputError] = useState(false);
  const [confirmarInputError, setConfirmarInputError] = useState(false);

  const validateEmail = (email) => {
    return email.match(/^\S+@\S+\.\S+$/);
  };

  const [isHoveringOverButtonRegister, setIsHoveringOverButtonRegister] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSendingProfilePicture, setIsSendingProfilePicture] =
    useState(false);
  const [isGreen, setIsGreen] = useState(false);

  const [isShowingMessage, setIsShowingMessage] = useState(false);

  const [isShowingErrorMessage, setIsShowingErrorMessage] = useState(false);
  const [errorMessagePopUp, setErrorMessagePopUp] = useState('');

  let validationFailed = false;

  async function validateForm(e) {
    e.preventDefault();

    let validationFailed = false;

    if (formBody.confirmarSenha === "" || formBody.confirmarSenha !== formBody.senha) {
      setConfirmarInputError(true);
      setFormBody({ ...formBody, confirmarSenha: "" });
      validationFailed = true;
      setErrorMessagePopUp('Senhas discrepantes.');
      setIsShowingErrorMessage(true);
    }

    if (formBody.senha === "" || formBody.senha.length < 8) {
      setSenhaInputError(true);
      setFormBody({ ...formBody, senha: "" });

      validationFailed = true;
      setErrorMessagePopUp('Senha deve ter no mínimo 8 caracteres.');
      setIsShowingErrorMessage(true);
    }

    if (formBody.email === "" || !validateEmail(formBody.email)) {
      setEmailInputError(true);
      setFormBody({ ...formBody, email: "" });
      validationFailed = true;
      setErrorMessagePopUp('Email inválido. Não o deixe vazio e verifique se ele é um email válido.');
      setIsShowingErrorMessage(true);
    }

    if (formBody.nome === "" || formBody.nome.replace(/\s/g, "") === "") {
      setNomeInputError(true);
      setFormBody({ ...formBody, nome: "" });
      validationFailed = true;
      setErrorMessagePopUp('Nome é obrigatório!');
      setIsShowingErrorMessage(true);
    }

    if (formBody.username === "" || /\s/.test(formBody.username)) {
      setUsernameInputError(true);
      setFormBody({ ...formBody, username: "" });
      validationFailed = true;
      setErrorMessagePopUp('Apelido inválido. Não utilize espaços e nem o deixe vazio.');
      setIsShowingErrorMessage(true);
    }

    if (validationFailed) {
      return;
    }

    setIsLoading(true);
    setCanChangeRegisterInputs(false);
    setIsShowingProfilePicturePanel(true);
  }

  async function sendRegisterRequest(e) {
    setIsSendingProfilePicture(true);
    const newUser = {
      username: formBody.username,
      name: formBody.nome,
      email: formBody.email,
      password: formBody.senha,
      avatar: formBody.avatar,
    };
    setTimeout(async () => {

        const response = await registerAccount(newUser);
        if (response.status === 201) {
          setIsGreen(true);
          setIsShowingMessage(true);
          setTimeout(() => {
            setIsShowingProfilePicturePanel(false);
          }, 1500);
          setIsSendingProfilePicture(false);

          setTimeout(() => {
            navigate("/home");
          }, 3000);
        }


        setIsGreen(false);
        setIsShowingMessage(true);
        setTimeout(() => {
          setIsShowingProfilePicturePanel(false);
        }, 1500);
        
        setIsSendingProfilePicture(false);

        if (response.status === 500) {
          setIsShowingErrorMessage(true);
          setErrorMessagePopUp(`Erro no servidor. Tente novamente mais tarde!`);
        }
        else {
          setIsShowingErrorMessage(true);
          setErrorMessagePopUp(`${response.data.message}`);
        }

        setTimeout(() => {
          setIsGreen(false);
          setIsShowingMessage(false);

          setIsLoading(false);
          setCanChangeRegisterInputs(true);
        }, 3000);
    }, 1500);
  }

  function removeError(input) {
    setIsShowingErrorMessage(false);
    setTimeout(() => {
      setErrorMessagePopUp('');
    }, 1000)
    switch (input) {
      case "username":
        setUsernameInputError(false);
        break;
      case "nome":
        setNomeInputError(false);
        break;
      case "email":
        setEmailInputError(false);
        break;
      case "senha":
        setSenhaInputError(false);
        break;
      case "confirmarSenha":
        setConfirmarInputError(false);
        break;
      default:
        break;
    }
  }

  function errorDefaultImage(img) {
    img.target.src =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  }

  function clearAvatar() {
    setFormBody({ ...formBody, avatar: "" });
  }

  return (
    <>
      <SendProfilePicturePanel
        $isShowingProfilePicturePanel={isShowingProfilePicturePanel}
      >
        <div className="send-profile-picture-position-relative">
          <ImCross
            color="white"
            className="quit-select-profile-picture"
            onClick={() => {
              setIsShowingProfilePicturePanel(false);
              setIsLoading(false);
              setCanChangeRegisterInputs(true);
            }}
          />
          <img
            className="profile-picture-preview"
            onError={errorDefaultImage}
            src={
              formBody.avatar === ""
                ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                : formBody.avatar
            }
            alt=""
          />
          <input
            type="text"
            name="avatar"
            className="input-padrao-register-profile-picture"
            placeholder="Insira o link da sua imagem de perfil (opcional)"
            value={formBody.avatar}
            onChange={formHandler}
          />
          <div className="profile-picture-buttons">
            <button
              className="limpar-button-profile-picture"
              onClick={clearAvatar}
            >
              Limpar
            </button>
            <button
              className="enviar-button-profile-picture"
              onClick={sendRegisterRequest}
            >
              {isSendingProfilePicture ? <Loader /> : "Enviar"}
            </button>
          </div>
        </div>
      </SendProfilePicturePanel>

      <div className="register-main">
        <PopUpConfirm $isGreen={isGreen} $isShowingMessage={isShowingMessage}>
          {isGreen
            ? `Registro realizado com sucesso. Redirecionando...`
            : `Falha no registro.`}
        </PopUpConfirm>
        <PopUpError $isShowingMessage={isShowingErrorMessage}>{errorMessagePopUp}</PopUpError>
        <p className="frase-inicial-register">
          Junte-se a nós e comece a compartilhar as suas experiências!
        </p>
        <form
          className="form-register"
          id="form-register"
          onSubmit={validateForm}
          noValidate
        >
          <h3 className="register-title">Registro</h3>
          <div className="input-section-register">
            <input
              type="text"
              name="username"
              id="username-form"
              value={formBody.username}
              onChange={formHandler}
              className={
                usernameInputError
                  ? "input-padrao-register input-padrao-invalido-register"
                  : "input-padrao-register"
              }
              placeholder={usernameInputError ? "Apelido inválido" : "Apelido"}
              onFocus={() => removeError("username")}
            />
          </div>
          <div className="input-section-register">
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
              placeholder={nomeInputError ? "Nome inválido" : "Nome"}
              onFocus={() => removeError("nome")}
            />
          </div>

          <div className="input-section-register">
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
              placeholder={emailInputError ? "Email inválido" : "Email"}
            />
          </div>
          <div className="input-section-senhas">
            <div className="input-section-register">
              <input
                type="password"
                name="senha"
                id="senha-form"
                value={formBody.senha}
                onChange={formHandler}
                className={
                  senhaInputError
                    ? "input-padrao-register-senha input-senha-media-register input-padrao-invalido-register"
                    : "input-padrao-register-senha input-senha-media-register"
                }
                onFocus={() => removeError("senha")}
                placeholder={senhaInputError ? "Senha inválida" : "Senha"}
              />
            </div>
            <div className="input-section-register">
              <input
                type="password"
                name="confirmarSenha"
                id="confirmar-form"
                value={formBody.confirmarSenha}
                onChange={formHandler}
                className={
                  confirmarInputError
                    ? "input-padrao-register-senha input-padrao-invalido-register"
                    : "input-padrao-register-senha"
                }
                onFocus={() => removeError("confirmarSenha")}
                placeholder={confirmarInputError ? "Senhas discrepantes" : "Confirmar senha"}
              />
            </div>
          </div>

          <button type="submit" className={`input-submit-register ${isHoveringOverButtonRegister ? 'input-submit-register-hover' : ''} ${isLoading ? 'input-submit-register-activated' : ''}`} onMouseOver={() => {
            setIsHoveringOverButtonRegister(true);
          }} onMouseLeave={() => {
            setIsHoveringOverButtonRegister(false)
          }}>
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