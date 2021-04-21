import React from 'react';

import Actions from '../components/actions';

import NavigationArea from '../components/layout/setout/root/areas/navigation.area';

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
