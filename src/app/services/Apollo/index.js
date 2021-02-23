import React from "react";
import get from "lodash/get";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useMsal } from "@azure/msal-react";

import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest, loginSilentRequest } from "../Auth/auth-config";

const Apollo = (App) =>
  function Apolloed() {
    const { instance, inProgress } = useMsal();

    const AsyncTokenLookup = async () => {
      const accounts = await instance.getAllAccounts();

      const account = get(accounts, "[0]");
      if (account && inProgress === "none") {
        try {
          const result = await instance.acquireTokenSilent({
            ...loginSilentRequest,
            account,
          });
          return result.accessToken;
        } catch (err) {
          if (err instanceof InteractionRequiredAuthError) {
            // fallback to interaction when silent call fails
            return instance.acquireTokenRedirect(loginRequest);
          }
        }
      } else if (!account && inProgress === "none") {
        return instance.acquireTokenRedirect(loginRequest);
      }
      return null
    };
    const withToken = setContext(async (_, { headers }) => {
      const token = await AsyncTokenLookup();
      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : null,
        },
      };
    });

    const httpLink = createHttpLink({
      uri: process.env.REACT_APP_BACKEND_URI,
    });

    const client = new ApolloClient({
      link: from([withToken, httpLink]),
      connectToDevTools: true,
      cache: new InMemoryCache(),
    });

    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
  };

export default Apollo;
