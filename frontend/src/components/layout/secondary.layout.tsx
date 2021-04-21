import React from 'react';

import { SideNav } from './side';

import Collections from '../collections';

import MainArea from './setout/root/areas/main.area';

import MainGrid from './setout/main/grid/main.grid';
import SecondaryArea from './setout/main/areas/secondary.area';

/**
 * Must be a child of SecondaryArea.
 * Component tree must follow:
 * {MainArea}
 *   => {MainGrid}
 *    before siblings
 *     => {SecondaryArea}
 *        {PrimaryArea}
 */

export const Secondary: React.FC<LayoutProps> = ({ children }) => {
  const wtf = 'wtf';
  return (
    <>
      <>
        <>
          <SecondaryArea>
            <SideNav>{children}</SideNav>
          </SecondaryArea>
        </>
      </>
    </>
  );
};
