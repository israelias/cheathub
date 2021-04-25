import React from 'react';
import { Grid } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

export const Wrapper: React.FC<LayoutProps> = ({ children }) => (
  <Grid
    mt={{ base: '8rem', lg: '4rem' }}
    padding={['0 2rem 20rem']}
    opacity={1}
  >
    {children}
  </Grid>
);
