import React from 'react';

import Navbar from '../navbar';

import TitleBarArea from './setout/root/areas/titlebar.area';

export const TitleBar: React.FC<LayoutProps> = ({ children }) => {
  const wtf = 'wtf';
  return (
    <>
      <TitleBarArea>
        <Navbar />
      </TitleBarArea>
    </>
  );
};
