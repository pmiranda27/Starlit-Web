import "./Register.css";
import React from "react";

import { Loader } from "../../Components/Loaders/Loader";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PopUpConfirm } from "../../Components/PopUpConfirm";

import { ImCross } from "react-icons/im";
import { SendProfilePicturePanel } from "../../Components/Send_Profile_Picture_Panel";

const Register = () => {
  const apiUrl =
    "https://3d9dba1f-2b5b-433f-a1b0-eb428d2de251-00-32rrmhyucky1c.worf.replit.dev";
  
  const axiosConnection = axios.create({
    baseURL: apiUrl,
    headers: {
      'Content-Type': 'application/json',
    }
  });

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

  const [CanChangeRegisterInputs, setCanChangeRegisterInputs] =
    React.useState(true);
  const [isShowingProfilePicturePanel, setIsShowingProfilePicturePanel] =
    React.useState(false);

  const formHandler = (e) => {
    let nome = e.target.name;
    let valor = e.target.value;

    if (!CanChangeRegisterInputs && nome !== "avatar") {
      return;
    }

    setFormBody({ ...formBody, [nome]: valor });
  };

  const [nomeInputError, setNomeInputError] = React.useState(false);
  const [emailInputError, setEmailInputError] = React.useState(false);
  const [senhaInputError, setSenhaInputError] = React.useState(false);
  const [confirmarInputError, setConfirmarInputError] = React.useState(false);

  const validateEmail = (email) => {
    return email.match(/^\S+@\S+\.\S+$/);
  };

  const [isLoading, setIsLoading] = React.useState(false);
  const [isSendingProfilePicture, setIsSendingProfilePicture] =
    React.useState(false);
  const [isGreen, setIsGreen] = React.useState(false);
  const [isShowingMessage, setIsShowingMessage] = React.useState(false);

  let validationFailed = false;

  async function validateForm(e) {
    e.preventDefault();

    if (formBody.nome === "" || formBody.nome.replace(/\s/g, "") === "") {
      setNomeInputError(true);
      formBody.nome = "";

      validationFailed = true;

      console.log("Nome inválido");
    }
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
    if (
      formBody.confirmarSenha === "" ||
      formBody.confirmarSenha !== formBody.senha
    ) {
      setConfirmarInputError(true);
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
        const response = await axiosConnection.post(`${apiUrl}/user/register`, newUser);
        if (response.status === 201) {
          setIsGreen(true);
          setIsShowingMessage(true);
          setTimeout(() => {
            setIsShowingProfilePicturePanel(false);
          }, 1500);
          setIsSendingProfilePicture(false);

          localStorage.setItem('token', response.data.token);

          setTimeout(() => {
            navigate("/home");
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