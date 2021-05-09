import React from 'react';
import { useMediaQuery } from '@chakra-ui/react';

import RootGrid from '../components/layout/root/grid/root.grid';
import MainGrid from '../components/layout/main/grid/main.grid';
import MainArea from '../components/layout/root/areas/main.area';

import { TitleBar } from './titlebar.container';
import { Navigation } from './navigation.container';

export const AppContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  return (
    <RootGrid>
      <TitleBar />

      {baseLg && <Navigation />}

      <MainArea>
        <MainGrid>{children}</MainGrid>
      </MainArea>
    </RootGrid>
  );
};
