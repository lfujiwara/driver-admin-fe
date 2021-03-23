import React from 'react';
import Icon from '@chakra-ui/icon';
import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/layout';
import { FaMapMarkerAlt, FaRegCircle } from 'react-icons/fa';
import { Trip } from '../api/trips.controller';
import { MotionBox } from './misc/animated';
import { Tooltip } from '@chakra-ui/tooltip';
import { formatCurrency } from '../lib/money';

const OriginDestination = ({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}) => {
  return (
    <VStack alignItems="flex-start">
      <HStack spacing="2" alignItems="center">
        <Tooltip hasArrow label="Origem">
          <span>
            <Icon as={FaRegCircle} />
          </span>
        </Tooltip>
        <span>{origin}</span>
      </HStack>
      <HStack spacing="2" alignItems="center" fontWeight="semibold">
        <Tooltip hasArrow label="Destino">
          <span>
            <Icon as={FaMapMarkerAlt} />
          </span>
        </Tooltip>
        <span>{destination}</span>
      </HStack>
    </VStack>
  );
};

const FareDisplay = ({ fare }: { fare: number }) => {
  return (
    <Flex justifyContent="space-between">
      <Text fontWeight="light">Total</Text>
      <Text fontWeight="semibold">{formatCurrency(fare / 100)}</Text>
    </Flex>
  );
};

const DateDisplay = ({ date: propsDate }: { date: Date | string }) => {
  const date = new Date(propsDate);
  const year = date.getFullYear();
  const formatMonth = Intl.DateTimeFormat(undefined, { month: 'short' }).format;
  const formatTime = Intl.DateTimeFormat(undefined, {
    timeStyle: 'short',
    hour12: false,
  }).format;

  return (
    <VStack spacing="0" alignItems="flex-end" textAlign="right">
      <Text fontWeight="light">{`${formatMonth(
        date
      )} ${date.getDate()}, ${formatTime(date)}`}</Text>
      <Text fontSize="xs">{year}</Text>
    </VStack>
  );
};

export default function TripCard(props: {
  trip: Trip;
  boxProps?: React.ComponentProps<typeof MotionBox>;
}) {
  const { trip, boxProps } = props;
  return (
    <MotionBox p="2" {...(boxProps || {})}>
      <HStack justifyContent="space-between" alignItems="flex-start">
        <OriginDestination
          origin={trip.origin}
          destination={trip.destination}
        />
        <DateDisplay date={trip.scheduledTime} />
      </HStack>
      <Box h="2" />
      <FareDisplay fare={trip.fare} />
    </MotionBox>
  );
}
