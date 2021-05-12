import React from 'react';
import { useMediaQuery } from '@chakra-ui/react';
import PrimaryArea from '../components/layout/main/areas/primary.area';
import Actions from '../components/navigation/actions';
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
}> = ({ children }) => {
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  return (
    <>
      <PrimaryArea>
        {!baseLg && <Actions />}
        <>{children}</>
      </PrimaryArea>
    </>
  );
};
