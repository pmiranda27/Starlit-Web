import React, { createContext, useState, useContext } from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [authUserCredentials, setUserCredentialsAuth] = useState(null);
  const [loggedToken, setLoggedToken] = useState('');

  async function setCredentials() {
    console.log('APLUPLUUUU')
    const cred = await verifyAuthentication();
    if (cred) {
      sessionStorage.setItem('userName', cred.name);
      console.log('userName: ', sessionStorage.getItem('userName'));
      sessionStorage.setItem('userEmail', cred.email);
      console.log('userEmail: ', sessionStorage.getItem('userEmail'));
      sessionStorage.setItem('userAvatar', cred.avatar);
      console.log('userAvatar: ', sessionStorage.getItem('userAvatar'));
      console.log("are tou ready: ", cred);
      setUserCredentialsAuth(cred);
    } else {
      console.log('GIVE ME TOUGH LOVE');
    }
  }

  function getCredentials() {
    for (var attempt = 0; attempt < 5; attempt++) {
      if (!authUserCredentials) {
        setCredentials();
        continue;
      } else {
        return authUserCredentials;
      }
    }
  }

  async function verifyAuthentication() {
    var verifyAuthenticationTries = 0;
    while (verifyAuthenticationTries < 5) {
      try {
        const isLoggedRequest = await axios.post(`${apiUrl}/user/verify-auth`, {
          loggedToken: loggedToken,
        });
        if (isLoggedRequest.status === 200) {
          return isLoggedRequest.data.decode;
        } else {
          return null;
        }
      } catch (error) {
        console.log(`error: ${error}`);
        verifyAuthenticationTries++;
        if (verifyAuthenticationTries === 5) {
          return null;
        }
      }
    }
  }

  async function loginAccount(loginUser) {
      if (!loginUser) {
        return null
      }
      console.log('luz')
      console.log(apiUrl)
      console.log(loginUser);
      try{
        const requestLogin = await axios.post(`${apiUrl}/user/login`, loginUser);
    
        if (requestLogin.status === 200) {
          localStorage.removeItem('token');
          localStorage.setItem('token', requestLogin.data.token);
          var tok = requestLogin.data.token;
          setLoggedToken(tok);
  
          // setCredentials();
          return requestLogin;
        }
        else {
          localStorage.removeItem('token');
          return requestLogin;
        }
      }catch(err){
        console.log("CHORAAAR: ", err)
      }
  }

  return (
    <AuthContext.Provider value={{ loginAccount, setCredentials, getCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
