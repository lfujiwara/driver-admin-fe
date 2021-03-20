import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Center, CircularProgress } from '@chakra-ui/react';

export default function App() {
  const auth0 = useAuth0();

  if (auth0.isLoading) {
    return (
      <Center w="100vw" h="100vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  if (!auth0.isAuthenticated) {
    auth0.loginWithRedirect();
  }

  auth0.getAccessTokenSilently({ scope: 'email profile' }).then(console.log);

  return (
    <Center w="100vw" h="100vh">
      <Button onClick={() => auth0.logout()}>Logout</Button>
    </Center>
  );
}
