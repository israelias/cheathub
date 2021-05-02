import React from 'react';
import { Content } from '../../connectors/main';
import { SideNav } from '../../connectors/side';
import Navbar from '../navigation/navbar';
// import Collections from '../collections';
import Actions from '../navigation/actions';

import RootGrid from './setout/root/grid/root.grid';
import NavigationArea from './setout/root/areas/navigation.area';
import TitleBarArea from './setout/root/areas/titlebar.area';
import MainArea from './setout/root/areas/main.area';

import MainGrid from './setout/main/grid/main.grid';
import SecondaryArea from './setout/main/areas/secondary.area';
import PrimaryArea from './setout/main/areas/primary.area';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const wtf = 'wtf';
  return (
    <RootGrid>
      <NavigationArea>
        <Actions />
      </NavigationArea>

      <TitleBarArea>
        <Navbar />
      </TitleBarArea>

      <MainArea>
        <MainGrid>
          <SecondaryArea>
            <SideNav>{/* <Collections /> */}</SideNav>
          </SecondaryArea>
          <PrimaryArea>
            <Content>{children}</Content>
          </PrimaryArea>
        </MainGrid>
      </MainArea>
    </RootGrid>
  );
};
export default Layout;
