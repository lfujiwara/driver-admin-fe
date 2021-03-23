import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingAuth from './components/app/LoadingAuth';
import RedirectingToAuth from './components/app/RedirectingToAuth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import { AxiosRequestConfig } from 'axios';
import { APIProvider, API_URL, makeApiContextValue } from './api/api.context';
import { QueryClient, QueryClientProvider } from 'react-query';
import Customers from './pages/Customers';
import CustomerPage from './pages/Customer';

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
    if (config.baseURL?.startsWith(API_URL)) {
      config.headers.Authorization = `Bearer ${await auth0.getAccessTokenSilently()}`;
    }
    return config;
  };

  const APIContextValue = makeApiContextValue(auth0Interceptor);

  return (
    <QueryClientProvider client={new QueryClient()}>
      <APIProvider value={APIContextValue}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Index />
            </Route>
            <Route exact path="/customers">
              <Customers />
            </Route>
            <Route path="/customers/:id">
              <CustomerPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </APIProvider>
    </QueryClientProvider>
  );
}
