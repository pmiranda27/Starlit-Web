import React, { createContext, useState, useContext } from "react";

import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [credentials, setUserCredentials] = useState(null);
    const [loggedToken, setLoggedToken] = useState(null);


    async function setCredentials() {
        const creds = await verifyAuthentication();
        setUserCredentials(creds);
    }

    async function getCredentials() {
        await setCredentials();
        return credentials;
    }

    async function verifyAuthentication() {
        var verifyAuthenticationTries = 0;
        while (true) {
            try {
                const isLoggedRequest = await axios.post(
                    `${apiUrl}/user/verify-auth`,
                    { loggedToken: loggedToken }
                );
                return isLoggedRequest.data.decode;
            } catch (error) {
                console.log(`error: ${error}`);
                if (verifyAuthenticationTries > 3) {
                    console.log("3 tentativas foram feitas, nenhuma funcionou!");
                    verifyAuthenticationTries++;
                }
                continue;
            }
        }
    }

    async function login(loginUser) {
        var loginTries = 0;
        try {
            const response = await axios.post(`${apiUrl}/user/login`, loginUser);

            setLoggedToken(response.data.token);
            localStorage.removeItem("token");
            localStorage.setItem("token", response.data.token);
            return response;
        } catch (error) {
            if (loginTries < 4) {
                loginTries++;
                login();
            }

            console.log("error: ", error);
            return error;
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