import React from 'react';
import { Content } from '../components/layout/main';

import PrimaryArea from '../components/layout/setout/main/areas/primary.area';

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
      <Content>{children}</Content>
    </PrimaryArea>
  </>
);
