import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingAuth from './components/app/LoadingAuth';
import RedirectingToAuth from './components/app/RedirectingToAuth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import { AxiosRequestConfig } from 'axios';
import { APIProvider, makeApiContextValue } from './api/api.context';

export default function AuthenticatedApp() {
  const auth0 = useAuth0();

  if (auth0.isLoading) {
    return <LoadingAuth />;
  }

  if (!auth0.isAuthenticated) {
    auth0.loginWithRedirect();
    return <RedirectingToAuth />;
  }

  const auth0Interceptor = async (config: AxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${await auth0.getAccessTokenSilently()}`;
    return config;
  };

  const APIContextValue = makeApiContextValue(auth0Interceptor);

  return (
    <APIProvider value={APIContextValue}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
        </Switch>
      </BrowserRouter>
    </APIProvider>
  );
}
