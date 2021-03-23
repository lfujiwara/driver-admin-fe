import React from 'react';
import { Box, Center, HStack, Text, VStack } from '@chakra-ui/layout';
import { FaAngleRight } from 'react-icons/fa';
import { Customer } from '../../api/customers.controller';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { IconButton } from '@chakra-ui/button';
import { Link } from 'react-router-dom';

export default function CustomerCard(props: Customer) {
  return (
    <Box p="2" bg={useColorModeValue('red.400', 'blue.600')}>
      <HStack>
        <VStack alignItems="flex-start" spacing="0" flex="1">
          <Text fontWeight="semibold">{props.name}</Text>
          <Text colorScheme="gray">
            {props.phoneNumber || '(11) 99144-3505'}
          </Text>
        </VStack>
        <Center>
          <IconButton
            as={Link}
            to={`/customers/${props.id}`}
            aria-label="open"
            variant="ghost"
          >
            <FaAngleRight />
          </IconButton>
        </Center>
      </HStack>
    </Box>
  );
}
