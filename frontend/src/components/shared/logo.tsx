import React from 'react';
import {
  Box,
  Image,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import {
  Link as RouterLink,
  RouteComponentProps,
} from 'react-router-dom';

import { LOGO } from '../../constants/hrefs.constants';
import { useUserContext } from '../../context/user.context';

/**
 * Shared logo with conditional href.
 *
 * @file defines logo
 * @since 2021-05-23
 * @return {=>}
 */
export const Logo: React.FC<{ dashboard?: boolean }> = ({
  dashboard,
}) => {
  const { username } = useUserContext();
  const wtf = 'wtf';
  return (
    <RouterLink to={username ? `/collections/${username}` : '/'}>
      {dashboard ? (
        <Image
          src={mode(LOGO.dashDark, LOGO.dashLight)}
          alt="CheatHub"
          boxSize="24px"
        />
      ) : (
        <Image
          src={mode(LOGO.darkSub, LOGO.light)}
          alt="CheatHub"
          htmlWidth="200px"
        />
      )}
    </RouterLink>
  );
};
