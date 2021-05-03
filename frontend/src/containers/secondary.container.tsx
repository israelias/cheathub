import React from 'react';

import { SideNav } from '../connectors/side';

import SecondaryArea from '../components/layout/main/areas/secondary.area';

interface ContainerProps {
  children?: React.ReactNode;
}

/**
 * Must be a child of SecondaryArea.
 * Component tree must follow:
 * {MainArea}
 *   => {MainGrid}
 *    before siblings
 *     => {SecondaryArea}
 *        {PrimaryArea}
 */

export const Secondary: React.FC<ContainerProps> = ({ children }) => (
  <>
    <SecondaryArea>
      {/* <SideNav> */}
      {children}
      {/* </SideNav> */}
    </SecondaryArea>
  </>
);
