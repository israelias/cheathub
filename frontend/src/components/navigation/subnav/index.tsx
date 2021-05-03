import React from 'react';
import {
  Box,
  Flex,
  Heading,
  useColorModeValue as mode,
  useMediaQuery,
  Button,
  HStack,
  IconButton,
  Icon,
} from '@chakra-ui/react';

import { AnimateSharedLayout } from 'framer-motion';

import { Link as RouterLink, useHistory } from 'react-router-dom';
import { MotionBox } from '../../shared/motion-box';
import { ACTIONS } from '../../../constants/actions.constants';
import { LogoutRequest } from '../../../lib/fetcher';
import { useUserContext } from '../../../context/user.context';

interface Props {
  children?: React.ReactNode;
}

const SubNav: React.FC<Props> = ({ children }) => {
  const {
    username,
    accessToken,
    setLoggedIn,
    setAccessToken,
    setUsername,
  } = useUserContext();
  const history = useHistory();
  const [buttonId, setButtonId] = React.useState('');
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  return (
    <>
      <>
        <HStack
          as="nav"
          id="secondary-header"
          zIndex={13}
          top={0}
          position="sticky"
          display={{ base: 'flex', lg: 'none' }}
          bg={mode('#fff', '#141625')}
          // margin={['0px -10px']}
          maxWidth={{ base: '100vw' }}
          borderBottom="1px"
          borderColor={mode('#ddd', '#7e88c3')}
          flex={['1 1 auto']}
          align="center"
          justifyContent="space-between"
        >
          <
            // flex={['1 1 auto']}
            // align="center"
            // justifyContent="space-between"
          >
            {ACTIONS.map((action, i) => (
              <>
                {baseLg ? (
                  <Button
                    key={action.label}
                    fontSize="14px"
                    flex={['1 0 auto']}
                    fontWeight="light"
                    rounded={0}
                    borderRight={mode(
                      '1px solid rgb(235, 236, 237)',
                      '1px solid #252945'
                    )}
                    variant="ghost"
                    width="25%"
                    margin={0}
                    marginInline={0}
                    marginBlock={0}
                    style={{ marginInlineStart: '0' }}
                    padding={0}
                    overflow="hidden"
                    aria-label={action.label}
                    _hover={{
                      borderBottom: '1px solid #1a1b1c',
                    }}
                    _pressed={{
                      borderLeft: '1px solid #1a1b1c',
                      borderRight: '1px solid #1a1b1c',
                    }}
                    _active={{
                      transition: 'all .3s ease .1s',
                      color: '#fff',
                    }}
                    onClick={() => {
                      setButtonId(action.label);
                      action.label === 'Collections' && username
                        ? history.push(`${action.path}/${username}`)
                        : history.push(action.path);
                    }}
                    onMouseOver={() => {
                      setButtonId(action.label);
                    }}
                    onPress={() => {
                      setButtonId(action.label);
                    }}
                    _focus={{
                      boxShadow: 0,
                    }}
                  >
                    {buttonId === action.label && (
                      <MotionBox
                        layoutId="border"
                        position="absolute"
                        display="flex"
                        width="100%"
                        height="2px"
                        bottom={0}
                        initial={true}
                        animate={{
                          borderColor: mode('#ddd', '#7e88c3'),
                          backgroundColor: mode('#ddd', '#7e88c3'),
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        }}
                        border={['1px solid']}
                        borderColor={mode('#ddd', '#7e88c3')}
                        borderRadius="0%"
                      />
                    )}
                    {action.label}
                  </Button>
                ) : (
                  <IconButton
                    variant="ghost"
                    alignItems="center"
                    padding={['8px 12px']}
                    margin={0}
                    marginInline={0}
                    borderRadius={0}
                    colorScheme="gray"
                    display="flex"
                    width="100%"
                    borderRight={mode(
                      '1px solid rgb(235, 236, 237)',
                      '1px solid #252945'
                    )}
                    aria-label={action.label}
                    key={action.label}
                    icon={<Icon as={action.icon} />}
                    // _before={{ content: `` }}
                    onClick={() => {
                      setButtonId(action.label);
                      action.label === 'Collections' && username
                        ? history.push(`${action.path}/${username}`)
                        : action.label === 'Sign Out'
                        ? LogoutRequest({
                            setLoggedIn,
                            setUsername,
                            accessToken,
                            setAccessToken,
                            history,
                            redirectTo: '/',
                          })
                        : history.push(action.path);
                    }}
                  />
                )}
              </>
            ))}
          </>
        </HStack>
      </>
    </>
  );
};

export default SubNav;
