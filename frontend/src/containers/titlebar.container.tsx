import React from 'react';

import Navbar from '../components/navbar';

import TitleBarArea from '../components/layout/setout/root/areas/titlebar.area';

interface ContainerProps {
  children?: React.ReactNode;
}

export const TitleBar: React.FC<ContainerProps> = ({ children }) => (
  <>
    <TitleBarArea>
      <Navbar />
    </TitleBarArea>
  </>
);
