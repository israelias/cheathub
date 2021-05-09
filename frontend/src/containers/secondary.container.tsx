import React from 'react';

import { SideNav } from '../connectors/side';

import SecondaryArea from '../components/layout/main/areas/secondary.area';

/**
 * Must be a child of SecondaryArea.
 * Component tree must follow:
 * {MainArea}
 *   => {MainGrid}
 *    before siblings
 *     => {SecondaryArea}
 *        {PrimaryArea}
 */

export const Secondary: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => (
  <>
    <SecondaryArea>
      {/* <SideNav> */}
      {children}
      {/* </SideNav> */}
    </SecondaryArea>
  </>
);
