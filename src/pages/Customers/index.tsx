import { Input, InputGroup, InputRightAddon } from '@chakra-ui/input';
import { Box, Text } from '@chakra-ui/layout';
import { CircularProgress } from '@chakra-ui/progress';
import React, { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useAPI } from '../../api/api.context';
import { FaSearch } from 'react-icons/fa';
import {
  MotionCenter,
  MotionVStack,
  PageAnimationSettings,
} from '../../components/misc/animated';
import CustomerCard from './customerCard';
import { AnimatePresence } from 'framer-motion';
import { delayPromise } from '../../lib/delayPromise';
import { Link } from 'react-router-dom';

export default function Customers() {
  const { customers } = useAPI();
  const inputRef = React.createRef<HTMLInputElement>();
  const [state, setState] = useState({ searchText: '' });
  const queryClient = useQueryClient();
  const query = useQuery(
    ['customers', { text: state.searchText }],
    () =>
      customers
        .search(state.searchText)
        .then((res) => res.data)
        .then(delayPromise(500)),
    {
      placeholderData: () =>
        queryClient.getQueryData('customers', { exact: false }) || [],
    }
  );

  return (
    <MotionCenter {...PageAnimationSettings} w="100%">
      <Box maxW="container.xl" w="100%">
        <Link to="/">
          <Text p="2" fontSize="sm" _hover={{ textDecor: 'underline' }}>
            Voltar
          </Text>
        </Link>
        <Box
          as="form"
          onSubmit={(e: any) => {
            e.preventDefault();
            setState({
              ...state,
              searchText: inputRef.current?.value || '',
            });
          }}
        >
          <InputGroup w="100%">
            <Input
              ref={inputRef}
              placeholder="Buscar por nome"
              rounded="none"
            />
            <InputRightAddon cursor="pointer" rounded="none">
              <FaSearch />
            </InputRightAddon>
          </InputGroup>
        </Box>
        <Box position="relative" w="100%" minH="64px" mt="4">
          <AnimatePresence>
            {(query.isLoading ||
              query.isPlaceholderData ||
              query.isPreviousData) && (
              <MotionCenter
                layout
                w="100%"
                h="64px"
                p="16px"
                position="absolute"
                {...PageAnimationSettings}
              >
                <CircularProgress h="32px" isIndeterminate />
              </MotionCenter>
            )}
          </AnimatePresence>
          <MotionVStack
            w="100%"
            animate={
              query.isLoading || query.isPlaceholderData || query.isPreviousData
                ? { filter: 'blur(4px)' }
                : { filter: 'blur(0)' }
            }
            alignItems="stretch"
          >
            {query.data?.map((customer, i) => (
              <CustomerCard key={i} {...customer} />
            ))}
          </MotionVStack>
        </Box>
      </Box>
    </MotionCenter>
  );
}
