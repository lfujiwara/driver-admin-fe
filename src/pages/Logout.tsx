import React from 'react';
import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Link } from 'react-router-dom';
import {
  MotionCenter,
  PageAnimationSettings,
} from '../components/misc/animated';

export default function Logout() {
  return (
    <MotionCenter {...PageAnimationSettings} w="100vw" h="100vh">
      <VStack spacing="4" alignItems="stretch">
        <Box>
          <Text fontSize="xl" fontWeight="semibold" textAlign="left">
            Deslogado
          </Text>
          <Text>Você precisa fazer login para continuar.</Text>
        </Box>
        <SimpleGrid columns={1} spacing="2" w="100%">
          <Link to="/">
            <Button w="100%">Login</Button>
          </Link>
        </SimpleGrid>
      </VStack>
    </MotionCenter>
  );
}
