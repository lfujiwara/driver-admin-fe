import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Redirect, useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAPI } from '../../api/api.context';
import {
  applyMotion,
  MotionBox,
  MotionCenter,
  PageAnimationSettings,
} from '../../components/misc/animated';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { formatISO, startOfMonth } from 'date-fns';
import { endOfMonth } from 'date-fns/esm';
import { Input } from '@chakra-ui/input';
import TripCard from '../../components/TripCardWithoutCustomer';

const MotionVStack = applyMotion(VStack);

const padWithZeros = (s: any, n: number) =>
  (Array(n).fill('0').join('') + s.toString()).slice(-n);

const dateFromMonthYear = (month: number | string, year: number | string) => {
  month = `00${month}`.slice(-2);
  year = `00${year}`.slice(-4);
  return new Date(`${year}-${month}-15`);
};

const buildDates = (month: number | string, year: number | string) => {
  const date = dateFromMonthYear(month, year);
  const [start, end] = [
    formatISO(startOfMonth(date)),
    formatISO(endOfMonth(date)),
  ];
  return { start, end };
};

export default function CustomerPage() {
  const { customers } = useAPI();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const customerId = Number(id);
  if (isNaN(customerId)) {
    history.replace('/customers');
  }

  const [state, setState] = useState({
    month: padWithZeros(new Date().getMonth() + 1, 2),
    year: padWithZeros(new Date().getFullYear(), 4),
  });

  const query = useQuery(
    `customer/${customerId}`,
    () => customers.getById(customerId).then((res) => res.data),
    { placeholderData: { name: '-', id: 0, phoneNumber: '-' } }
  );
  const reportQuery = useQuery(
    [`customer/${customerId}/report`, buildDates(state.month, state.year)],
    () => {
      const { start, end } = buildDates(state.month, state.year);
      return customers
        .getMonthlyReportById(customerId, start, end)
        .then((res) => res.data);
    }
  );

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const [year, month] = e.target.value.split('-');
    setState({ ...state, month, year });
  };

  const formatCurrency = (value: number) =>
    Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  return (
    <>
      {isNaN(Number(id)) && <Redirect to="/customers" />}
      <MotionCenter {...PageAnimationSettings}>
        <Box maxW="container.xl" w="100%" pb="16px">
          <Link to="/customers">
            <Text p="2" fontSize="sm" _hover={{ textDecor: 'underline' }}>
              Voltar
            </Text>
          </Link>
          <MotionVStack
            w="100%"
            p="4"
            bgColor={useColorModeValue('blue.400', 'blue.600')}
          >
            <Box textAlign="center">
              <Text fontSize="lg" fontWeight="semibold">
                {query.data?.name}
              </Text>
              <Text fontSize="sm"> {query.data?.phoneNumber}</Text>
            </Box>
          </MotionVStack>
          <Box
            w="100%"
            mt="4"
            p="4"
            bgColor={useColorModeValue('blue.400', 'blue.600')}
          >
            <VStack>
              <Input
                fontWeight="semibold"
                type="month"
                value={`${state.year}-${state.month}`}
                onChange={handleInputChange}
                maxW="64"
              />
              {reportQuery.data && (
                <SimpleGrid columns={3} p="2" maxW="72">
                  <Text textAlign="center" fontSize="sm" fontWeight="bold">
                    Corridas
                  </Text>
                  <Text textAlign="center" fontSize="sm" fontWeight="bold">
                    Tarifa média
                  </Text>
                  <Text textAlign="center" fontSize="sm" fontWeight="bold">
                    Total
                  </Text>
                  <Text textAlign="center" fontSize="sm">
                    {reportQuery.data.aggregate.count}
                  </Text>
                  <Text textAlign="center" fontSize="sm">
                    {formatCurrency(reportQuery.data.aggregate.avg.fare / 100)}
                  </Text>
                  <Text textAlign="center" fontSize="sm">
                    {formatCurrency(reportQuery.data.aggregate.sum.fare / 100)}
                  </Text>
                </SimpleGrid>
              )}
            </VStack>
            <Text fontWeight="semibold">Corridas</Text>
            <MotionVStack
              layout
              spacing="2"
              mt="4"
              position="relative"
              alignItems="center"
            >
              {reportQuery.data &&
                reportQuery.data.trips.map((trip, i) => (
                  <TripCard
                    key={i}
                    trip={trip}
                    boxProps={{
                      border: '1px solid',
                      rounded: 'md',
                      width: '100%',
                      maxWidth: 'container.sm',
                    }}
                  />
                ))}
            </MotionVStack>
          </Box>
        </Box>
      </MotionCenter>
    </>
  );
}
