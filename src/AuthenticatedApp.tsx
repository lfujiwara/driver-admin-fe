import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingAuth from './components/app/LoadingAuth';
import RedirectingToAuth from './components/app/RedirectingToAuth';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './pages/Index';

export default function AuthenticatedApp() {
  const auth0 = useAuth0();

  if (auth0.isLoading) {
    return <LoadingAuth />;
  }

  if (!auth0.isAuthenticated) {
    auth0.loginWithRedirect();
    return <RedirectingToAuth />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
