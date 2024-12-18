import React, { createContext, useState, useContext } from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [authUserCredentials, setUserCredentialsAuth] = useState(null);
  const [loggedToken, setLoggedToken] = useState('');

  const tentativasMaximasRequests = 5;

  function setToken(token) {
    setLoggedToken(token);
  }


  function getCredentials() {
    const credenciais = {
      name: sessionStorage.getItem('username'),
      email: sessionStorage.getItem('email'),
      avatar: sessionStorage.getItem('avatar')
    }

    return credenciais;
  }

  function clearSessionAndLocalStorage() {
    localStorage.removeItem('token');

    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('avatar');

    console.log('sessão limpa!');
  }

  async function loginAccount(userForm) {
    try {
      const response = await axios.post(`${apiUrl}/user/login`, userForm);

      const tok = response.data.token;
      setLoggedToken(tok);

      clearSessionAndLocalStorage();

      localStorage.setItem('token', tok);
      sessionStorage.setItem('username', response.data.usuario);
      sessionStorage.setItem('email', userForm.email);
      sessionStorage.setItem('avatar', response.data.avatar);

      return {
        status: response.status,
        message: response.data.message
      };
    } catch (error) {
      // Em caso de erro, só retorna a mensagem de erro
      return {
        status: error.response ? error.response.status : 500,
        message: error.response ? error.response.data.message : "Erro desconhecido"
      };
    }
  }

  async function registerAccount(userRegisterForm) {
    try {
      const response = await axios.post(`${apiUrl}/user/register`, userRegisterForm);
      console.log('papibaquigrafo: ', response.data.token);

      const tok = response.data.token;

      clearSessionAndLocalStorage();

      localStorage.setItem('token', tok);
      sessionStorage.setItem('username', userRegisterForm.username);
      sessionStorage.setItem('email', userRegisterForm.email);
      sessionStorage.setItem('avatar', userRegisterForm.avatar);

      return 201
    } catch (error) {
      console.log('ERRO: ', error);
      clearSessionAndLocalStorage();
      return {
        status: error.response ? error.response.status : 500,
        message: 'Falha no registro'
      }
    }
  }

  async function getReviewsQuantity(username) {
    for (var tentativa = 0; tentativa < tentativasMaximasRequests; tentativa++) {
      const responseQuantidadeReviews = await axios.post(`${apiUrl}/reviews/quantidadeUsuario`, {
        username
      });

      if (!responseQuantidadeReviews) {
        continue;
      }
      if (responseQuantidadeReviews.status < 200 || responseQuantidadeReviews.status > 299) {
        continue;
      }

      return responseQuantidadeReviews.data.quantidade;
    }
  }

  async function getDescricaoText(username) {
    for (var tentativa = 0; tentativa < tentativasMaximasRequests; tentativa++) {
      const responseDescricaoUsuario = await axios.get(`${apiUrl}/user/descricao-usuario`, {
        params: {
          username: username
        }
      });

      if (!responseDescricaoUsuario) {
        continue;
      }
      if (responseDescricaoUsuario.status < 200 || responseDescricaoUsuario.status > 299) {
        continue;
      }

      return responseDescricaoUsuario.data.descricao;
    }
  }

  return (
    <AuthContext.Provider value={{ registerAccount, loginAccount, getCredentials, getReviewsQuantity, getDescricaoText, clearSessionAndLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
