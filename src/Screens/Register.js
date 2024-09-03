import "./Register.css";
import React from "react";
import InputInvalidError from "../Components/Form_Validators";

import { Loader } from "../Components/Loader";
import ShootingStars from "../Components/Shooting_Stars";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUpConfirm from "../Components/PopUpConfirm";

import { ImCross } from "react-icons/im";
import { SendProfilePicturePanel } from "../Components/Send_Profile_Picture_Panel";

const Register = () => {
  const apiUrl =
    "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";

  const navigate = useNavigate();
  const ToLogin = () => {
    navigate("/login");
  };

  const [formBody, setFormBody] = React.useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    avatar: "",
  });

  const [CanChangeRegisterInputs, setCanChangeRegisterInputs] = React.useState(true);
  const [isShowingProfilePicturePanel, setIsShowingProfilePicturePanel] =
    React.useState(false);

  const formHandler = (e) => {
    let nome = e.target.name;
    let valor = e.target.value;

    if (!CanChangeRegisterInputs && nome != "avatar") {
      return;
    }

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
  const [isSendingProfilePicture, setIsSendingProfilePicture] = React.useState(false);
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

    setIsLoading(true);

    setCanChangeRegisterInputs(false);
    setIsShowingProfilePicturePanel(true);
  }

  async function sendRegisterRequest(e) {
    setIsSendingProfilePicture(true);
    const newUser = {
      name: formBody.nome,
      email: formBody.email,
      password: formBody.senha,
      avatar: formBody.avatar,
    };
    setTimeout(async () => {
      try {
        const response = await axios.post(`${apiUrl}/user/register`, newUser);
        if (response.status === 201) {
          setIsGreen(true);
          setIsShowingMessage(true);
          setTimeout(() => {
            setIsShowingProfilePicturePanel(false);
          }, 1500);
          setIsSendingProfilePicture(false);

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }
        console.log("O status code da resposta é: ", response.status);
      } catch (error) {
        setIsGreen(false);
        setIsShowingMessage(true);
        setTimeout(() => {
          setIsShowingProfilePicturePanel(false);
        }, 1500);
        setIsSendingProfilePicture(false);

        setTimeout(() => {
          setIsGreen(false);
          setIsShowingMessage(false);

          formBody.nome = "";
          formBody.email = "";
          formBody.senha = "";
          formBody.confirmarSenha = "";
          formBody.avatar = "";

          setIsLoading(false);
          setCanChangeRegisterInputs(true);
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

  function errorDefaultImage(img) {
    img.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  }

  function clearAvatar() {
    setFormBody({ ...formBody, avatar: "" });
  }

  return (
    <>
      <ShootingStars />
      <SendProfilePicturePanel $isShowingProfilePicturePanel={isShowingProfilePicturePanel}>
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
            <button className="enviar-button-profile-picture" onClick={sendRegisterRequest}>{isSendingProfilePicture ? <Loader /> : "Enviar"}</button>
          </div>
        </div>
      </SendProfilePicturePanel>

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
              Por favor, insira um email válido.
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
            <InputInvalidError
              $isPassword={true}
              $isVisible={senhaErrorMessage}
              id="senha-error"
            >
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
