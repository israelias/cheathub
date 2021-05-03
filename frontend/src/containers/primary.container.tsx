import React from 'react';
// import { Content } from '../connectors/main';

import PrimaryArea from '../components/layout/main/areas/primary.area';
import SubNav from '../components/navigation/subnav';

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

export const Primary: React.FC<ContainerProps> = ({ children }) => (
  <>
    <PrimaryArea>
      <SubNav />
      <>{children}</>
    </PrimaryArea>
  </>
);
