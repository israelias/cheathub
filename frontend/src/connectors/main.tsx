/* eslint-disable no-console */
import React from 'react';
import { Flex, useColorModeValue as mode } from '@chakra-ui/react';

import PrimaryArea from '../components/layout/main/areas/primary.area';
import SubNav from '../components/navigation/subnav';

interface Props {
  children: React.ReactNode;
}

export const Content: React.FC<Props> = ({ children }) => {
  const wtf = 'wtf';

  return (
    <PrimaryArea>
      <Flex
        as="section"
        flexDirection="column"
        // bg="main.bgColor"
        // borderBottom="1px"
      >
        <SubNav />

        <>{children}</>
      </Flex>
    </PrimaryArea>
  );
};
