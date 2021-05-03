import React from 'react';

import RootGrid from '../components/layout/root/grid/root.grid';
import MainGrid from '../components/layout/main/grid/main.grid';
import MainArea from '../components/layout/root/areas/main.area';

import { TitleBar } from './titlebar.container';
import { Navigation } from './navigation.container';

export const AppContainer: React.FC<LayoutProps> = ({ children }) => (
  <RootGrid>
    <Navigation />
    <TitleBar />

    <MainArea>
      <MainGrid>{children}</MainGrid>
    </MainArea>
  </RootGrid>
);
