import React from 'react';
import { Center, HStack, Text } from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/progress';
import { MotionCenter, PageAnimationSettings } from '../misc/animated';

export default function RedirectingToAuth() {
  return (
    <MotionCenter {...PageAnimationSettings} w="100vw" h="100vh">
      <HStack spacing="16px">
        <Text fontSize="xl">Redirecionando para página de login</Text>
        <CircularProgress isIndeterminate />
      </HStack>
    </MotionCenter>
  );
}
