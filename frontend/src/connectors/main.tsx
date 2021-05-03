/* eslint-disable no-console */
import React from 'react';
import { Flex, useColorModeValue as mode } from '@chakra-ui/react';

import PrimaryArea from '../components/layout/main/areas/primary.area';
import SubNav from '../components/navigation/subnav';
import { Primary } from '../containers/primary.container';

interface Props {
  children: React.ReactNode;
}

export const Content: React.FC<Props> = ({ children }) => {
  const wtf = 'wtf';

  return (
    <Primary>
      {/* <SubNav /> */}

      <>{children}</>
    </Primary>
  );
};
