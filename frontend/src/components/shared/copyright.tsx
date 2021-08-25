import {
  Text,
  Link,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { useUserContext } from '../../context/user.context';

/**
 * Shared copyright link to github profile.
 *
 * @file defines Copyright
 * @since 2021-05-23
 * @return {=>}
 */
export const Copyright = () => (
  <>
    Made by{' '}
    <Text
      as="span"
      color={mode('#252945', '#7e88c3')}
      fontWeight="bold"
    >
      Joem Elias Sanez
    </Text>{' '}
    <Link href="https://github.com/israelias" isExternal>
      @israelias
    </Link>
  </>
);
