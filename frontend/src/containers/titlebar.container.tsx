import React from 'react';

import Navbar from '../components/navigation/navbar';

import TitleBarArea from '../components/layout/root/areas/titlebar.area';

export const TitleBar: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => (
  <>
    <TitleBarArea>
      <Navbar />
      {children}
    </TitleBarArea>
  </>
);
