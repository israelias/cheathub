import React from 'react';

import Actions from '../components/navigation/actions';

import NavigationArea from '../components/layout/root/areas/navigation.area';

interface ContainerProps {
  children?: React.ReactNode;
}

export const Navigation: React.FC<ContainerProps> = ({
  children,
}) => (
  <>
    <NavigationArea>
      <Actions />
    </NavigationArea>
  </>
);
