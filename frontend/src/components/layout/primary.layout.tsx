import React from 'react';
import { Content } from './main';
import { SideNav } from './side';
import Navbar from '../navbar';
import Collections from '../collections';
import Actions from '../actions';

import RootGrid from './setout/root/grid/root.grid';
import NavigationArea from './setout/root/areas/navigation.area';
import TitleBarArea from './setout/root/areas/titlebar.area';
import MainArea from './setout/root/areas/main.area';

import MainGrid from './setout/main/grid/main.grid';
import SecondaryArea from './setout/main/areas/secondary.area';
import PrimaryArea from './setout/main/areas/primary.area';

/**
 * Must be a child of SecondaryArea.
 * Component tree must follow:
 * {MainArea}
 *   => {MainGrid}
 *    before siblings
 *     => {SecondaryArea}
 *        {PrimaryArea}
 */

export const Primary: React.FC<LayoutProps> = ({ children }) => {
  const wtf = 'wtf';
  return (
    <>
      <>
        <>
          <PrimaryArea>
            <Content>{children}</Content>
          </PrimaryArea>
        </>
      </>
    </>
  );
};
