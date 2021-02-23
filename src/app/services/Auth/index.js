import React from "react";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

import { msalConfig } from "./auth-config";

export default function Auth(App) {
  return function AuthWrapper() {
    const msalInstance = new PublicClientApplication(msalConfig);
    return (
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    );
  };
}
