import React, { createContext, useState, useContext } from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [credentials, setUserCredentialsAuth] = useState();
    var loggedToken = '';


    async function setCredentials() {
        const cred = await verifyAuthentication();
        setUserCredentialsAuth(cred);
        console.log('are tou ready: ', cred)
    }

    function getCredentials() {
        return credentials;
    }

    async function verifyAuthentication() {
        var verifyAuthenticationTries = 0;
        while (verifyAuthenticationTries <= 10) {
            try {
                const isLoggedRequest = await axios.post(
                    `${apiUrl}/user/verify-auth`,
                    { loggedToken: loggedToken }
                );
                console.log('isLoggedRequest: ', isLoggedRequest);
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
                console.log('setLoggedToken: ', loggedToken);
                setCredentials();
                return response;
            } catch (error) {
                loginTries++;
                console.log("error: ", error);
                return error;
            }
        }
    }

    return (
        <AuthContext.Provider value={{ login, setCredentials, getCredentials }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}