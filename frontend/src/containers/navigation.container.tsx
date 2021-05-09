import React from 'react';

import Actions from '../components/navigation/actions';

import NavigationArea from '../components/layout/root/areas/navigation.area';

export const Navigation: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => (
  <>
    <NavigationArea>
      <Actions />
      {children}
    </NavigationArea>
  </>
);
