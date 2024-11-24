import React, { createContext, useState, useContext } from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [authUserCredentials, setUserCredentialsAuth] = useState(null);
  const [loggedToken, setLoggedToken] = useState('');

  function setToken(token) {
    setLoggedToken(token);
  }

  // async function setCredentials() {
  //   console.log('APLUPLUUUU')
  //   const cred = await verifyAuthentication();
  //   if (cred) {
  //     sessionStorage.setItem('userName', cred.name);
  //     console.log('userName: ', sessionStorage.getItem('userName'));
  //     sessionStorage.setItem('userEmail', cred.email);
  //     console.log('userEmail: ', sessionStorage.getItem('userEmail'));
  //     sessionStorage.setItem('userAvatar', cred.avatar);
  //     console.log('userAvatar: ', sessionStorage.getItem('userAvatar'));
  //     console.log("are tou ready: ", cred);
  //     setUserCredentialsAuth(cred);
  //   } else {
  //     console.log('GIVE ME TOUGH LOVE');
  //   }
  // }

  function getCredentials() {
    const credenciais = {
      name: sessionStorage.getItem('name'),
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
  }

  async function loginAccount(userForm) {
    const response = await axios.post(`${apiUrl}/user/login`, userForm);
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      console.log('papibaquigrafo: ', response.data.token);

      const tok = response.data.token;
      setLoggedToken(tok);

      clearSessionAndLocalStorage();

      localStorage.setItem('token', tok);
      sessionStorage.setItem('username', response.data.usuario);
      sessionStorage.setItem('email', userForm.email);
      sessionStorage.setItem('avatar', response.data.avatar);

      return {
        status: response.status,
        message: 'Sucesso no login'
      }
    }
    else {
      console.log('ERRO: ', response);
      clearSessionAndLocalStorage();
      return {
        status: response.status,
        message: 'Falha no login'
      }
    }
  }

  async function registerAccount(userRegisterForm) {
    const response = await axios.post(`${apiUrl}/user/register`, userRegisterForm);
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
      console.log('papibaquigrafo: ', response.data.token);

      const tok = response.data.token;
      setLoggedToken(tok);

      clearSessionAndLocalStorage();

      localStorage.setItem('token', tok);
      sessionStorage.setItem('username', userRegisterForm.username);
      sessionStorage.setItem('email', userRegisterForm.email);
      sessionStorage.setItem('avatar', userRegisterForm.avatar);

      return {
        status: response.status,
        message: 'Sucesso no registro'
      }
    }
    else {
      console.log('ERRO: ', response);
      clearSessionAndLocalStorage();
      return {
        status: response.status,
        message: 'Falha no registro'
      }
    }
  }

  async function getReviewsQuantity() {
    
  }

  return (
    <AuthContext.Provider value={{ registerAccount, loginAccount, getCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
