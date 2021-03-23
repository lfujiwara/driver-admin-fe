// @ts-nocheck
import * as React from 'react';
import {
  forwardRef,
  Box,
  BoxProps,
  ComponentWithAs,
  CenterProps,
  Center,
  StackProps,
  VStack,
} from '@chakra-ui/react';
import { motion, MotionProps, isValidMotionProp } from 'framer-motion';

export type GenericMotionProps<Props> = Omit<Props, keyof MotionProps> &
  MotionProps & {
    as?: React.ElementType;
  };

type As<Props = any> = React.ElementType<Props>;

function generateMotion<Props extends object, T extends As>(
  Component: React.ComponentClass<Props, any> | React.FunctionComponent<Props>
) {
  // @ts-ignore
  const Wrapped = motion.custom(
    forwardRef<Props, T>((props, ref) => {
      const chakraProps = Object.fromEntries(
        // do not pass framer props to DOM element
        Object.entries(props).filter(([key]) => !isValidMotionProp(key))
      );
      // @ts-ignore
      return <Component ref={ref} {...chakraProps} />;
    })
  ) as ComponentWithAs<T, GenericMotionProps<Props>>;
  Wrapped.displayName = `Motion${Component.displayName}`;
  return Wrapped;
}

export const applyMotion = (c: ComponentWithAs<T, E>) =>
  generateMotion<React.ComponentProps<E>, T>(c);

export const MotionBox = generateMotion<BoxProps, 'div'>(Box);
export const MotionCenter = generateMotion<CenterProps, 'div'>(Center);
export const MotionVStack = generateMotion<StackProps, 'div'>(VStack);

export const PageAnimationSettings: MotionProps = {
  transition: { duration: 0.5 },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
