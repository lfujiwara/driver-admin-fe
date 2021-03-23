import React from 'react';
import { Text, VStack } from '@chakra-ui/layout';
import {
  MotionCenter,
  PageAnimationSettings,
} from '../components/misc/animated';
import { Button } from '@chakra-ui/button';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router';

export default function Index() {
  const { logout, user } = useAuth0();
  const history = useHistory();

  return (
    <MotionCenter {...PageAnimationSettings} w="100vw" h="100vh">
      <VStack alignItems="stretch">
        <Text>Olá, {user.name}</Text>
        <Button
          onClick={() =>
            logout({ returnTo: `${window.location.origin}/logout` })
          }
        >
          Logout
        </Button>
        <Button onClick={() => history.push('/customers')}>Clientes</Button>
      </VStack>
    </MotionCenter>
  );
}
