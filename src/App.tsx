import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthenticatedApp from './AuthenticatedApp';
import Logout from './pages/Logout';

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/logout">
          <Logout />
        </Route>
        <Route path="/">
          <QueryClientProvider client={new QueryClient()}>
            <AuthenticatedApp />
          </QueryClientProvider>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
