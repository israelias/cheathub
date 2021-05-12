import React from 'react';

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
    <SecondaryArea>{children}</SecondaryArea>
  </>
);
