import React from 'react';

import Actions from '../actions';

import NavigationArea from './setout/root/areas/navigation.area';

export const Navigation: React.FC<LayoutProps> = ({ children }) => {
  const wtf = 'wtf';
  return (
    <>
      <NavigationArea>
        <Actions />
      </NavigationArea>
    </>
  );
};
