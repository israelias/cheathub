import React from 'react';
import {
  useMediaQuery,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import Actions from '../components/navigation/actions';
import { Primary } from '../containers/primary.container';

export const Content: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [baseLg] = useMediaQuery('(min-width: 62em)');

  return (
    <Primary>
      {!baseLg && <Actions />}

      <>{children}</>
    </Primary>
  );
};
