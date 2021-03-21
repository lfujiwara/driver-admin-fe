import React from 'react';
import { Text, VStack } from '@chakra-ui/layout';
import {
  MotionCenter,
  PageAnimationSettings,
} from '../components/misc/animated';
import { Button } from '@chakra-ui/button';
import { useAuth0 } from '@auth0/auth0-react';

export default function Index() {
  const { logout, user } = useAuth0();
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
      </VStack>
    </MotionCenter>
  );
}
