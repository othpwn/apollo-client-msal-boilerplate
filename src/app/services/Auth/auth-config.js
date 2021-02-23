export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_MSAL_CLIENT_ID,
    authority:
      `https://login.microsoftonline.com/${process.env.REACT_APP_MSAL_TENANT_ID}`,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: "localStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: [`${process.env.REACT_APP_MSAL_CLIENT_ID}/user.read`],
  prompt: "select_account",
};

export const loginSilentRequest = {
  scopes: [`${process.env.REACT_APP_MSAL_CLIENT_ID}/user.read`],
};