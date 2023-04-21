import { PublicClientApplication } from "@azure/msal-browser";
import config from "src/config/config";

const publicClientApplication = new PublicClientApplication({
    auth: {
        clientId: config.AUTH_APP_ID,
        redirectUri: config.AUTH_REDIRECT_URI,
        authority: config.AUTHORITY,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: true,
    },
});

// AZURE AD login
export const azureADLogin = async () => {
    try {
        await publicClientApplication.loginPopup({
            scopes: config.SCOPES,
            prompt: "select_account",
        });
        return {
            status: 200,
            data: localStorage,
        };
    } catch (error) {
        return error.message;
    }
};

//Logout
export const doLogout = async () => {
    try {
        publicClientApplication.logoutPopup();
        return {
            status: 200,
            data: "Logged Out",
        };
    } catch (error) {
        return error.message;
    }
}

export const fetchUser = async (token) => {
    try {
        const response = await fetch(`${config.API_URL}/v1/common/get-user`, {
            headers: {Authorization: "Bearer "+ token},
            'Content-Type': 'application/json'
          });
        if (!response.ok) {
            throw new Error('Something went wrong!')
        }
        const dBdata = await response.json();
        return {
            status: response.status,
            data: dBdata
        };
    } catch (error) {
        return error.message;
    }
}