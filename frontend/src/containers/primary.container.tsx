import React from 'react';
import PrimaryArea from '../components/layout/main/areas/primary.area';

/**
 * Must be a child of SecondaryArea.
 * Component tree must follow:
 * {MainArea}
 *   => {MainGrid}
 *    before siblings
 *     => {SecondaryArea}
 *        {PrimaryArea}
 */

export const Primary: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => (
  <>
    <PrimaryArea>
      <>{children}</>
    </PrimaryArea>
  </>
);
