import { Spinner } from '@chakra-ui/react';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GymComponent: React.LazyExoticComponent<any> = React.lazy(() => import('./GymContainer'));

export const GymAsyncComponent = () => (
  <React.Suspense fallback={<Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />}>
    <GymComponent />
  </React.Suspense>
);
