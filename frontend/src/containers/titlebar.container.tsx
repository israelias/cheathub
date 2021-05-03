import React from 'react';

import Navbar from '../components/navigation/navbar';

import TitleBarArea from '../components/layout/root/areas/titlebar.area';

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
