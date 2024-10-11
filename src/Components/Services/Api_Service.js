import React, { createContext, useState, useContext, useEffect } from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [authUserCredentials, setUserCredentialsAuth] = useState(null);
  var loggedToken = "";

  async function setCredentials() {
    const cred = await verifyAuthentication();
    setUserCredentialsAuth(cred);
    console.log("are tou ready: ", cred);
  }

  function getCredentials() {
    if (!authUserCredentials) {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          if (authUserCredentials) {
            clearInterval(interval);
            resolve(authUserCredentials);
          }
        }, 100); // Checa a cada 100ms
      });
    }
    return authUserCredentials;
  }

  async function verifyAuthentication() {
    var verifyAuthenticationTries = 0;
    while (verifyAuthenticationTries <= 10) {
      try {
        const isLoggedRequest = await axios.post(`${apiUrl}/user/verify-auth`, {
          loggedToken: loggedToken,
        });
        return isLoggedRequest.data.decode;
      } catch (error) {
        console.log(`error: ${error}`);
      }
    }
  }

  async function login(loginUser) {
    var loginTries = 0;
    while (loginTries <= 3) {
      try {
        const response = await axios.post(`${apiUrl}/user/login`, loginUser);

        localStorage.removeItem("token");
        localStorage.setItem("token", response.data.token);
        loggedToken = localStorage.getItem("token");
        setCredentials();
        return response;
      } catch (error) {
        loginTries++;
        console.log("error: ", error);
        return error;
      }
    }
  }

  useEffect(() => {
    setCredentials();
  }, [authUserCredentials]);

  return (
    <AuthContext.Provider value={{ login, setCredentials, getCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
