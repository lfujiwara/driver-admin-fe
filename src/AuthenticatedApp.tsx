import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingAuth from './components/app/LoadingAuth';
import RedirectingToAuth from './components/app/RedirectingToAuth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';
import { AxiosRequestConfig } from 'axios';
import { APIProvider, API_URL, makeApiContextValue } from './api/api.context';
import { useIsFetching, useIsMutating } from 'react-query';
import Customers from './pages/Customers';
import CustomerPage from './pages/Customer';
import { Progress } from '@chakra-ui/progress';
import { Box } from '@chakra-ui/layout';

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
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <APIProvider value={APIContextValue}>
      <BrowserRouter>
        <Box boxSizing="border-box">
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
        </Box>
        {(isFetching > 0 || isMutating > 0) && (
          <Progress
            size="sm"
            position="fixed"
            bottom={0}
            w="100%"
            isIndeterminate
          />
        )}
      </BrowserRouter>
    </APIProvider>
  );
}
