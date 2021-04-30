import React from 'react';
import {
  Box,
  Flex,
  Heading,
  useColorModeValue as mode,
  Button,
  HStack,
} from '@chakra-ui/react';

import { AnimateSharedLayout } from 'framer-motion';

import { Link as RouterLink, useHistory } from 'react-router-dom';
import { MotionBox } from '../../shared/motion-box';
import { ACTIONS } from '../../../constants/actions.constants';
import { useUserContext } from '../../../context/user.context';
// import { navigation } from '../constants/colors.constants'

interface Props {
  children?: React.ReactNode;
}

const SubNav: React.FC<Props> = ({ children }) => {
  const { username } = useUserContext();
  const history = useHistory();
  const [buttonId, setButtonId] = React.useState('');

  return (
    <>
      <AnimateSharedLayout>
        <Flex
          id="secondary-header"
          zIndex={13}
          top={0}
          position="sticky"
          display={{ base: 'flex', lg: 'none' }}
          bg={mode('gray.50', 'gray.800')}
          width="100%"
          maxWidth={{ base: '100vw' }}
          borderBottom="1px"
          borderColor="gray.200"
          // overflow={{ base: 'scroll hidden', lg: 'scroll hidden' }}
        >
          <HStack
            flex={['1 1 auto']}
            align="center"
            justifyContent="space-between"
            bg={mode('white', 'gray.100')}
          >
            {ACTIONS.map((action, i) => (
              <>
                <Button
                  key={action.label}
                  fontSize="14px"
                  flex={['1 0 auto']}
                  fontWeight="light"
                  colorScheme="teal"
                  rounded={0}
                  borderRight="1px"
                  borderColor="gray.200"
                  variant="ghost"
                  width="25%"
                  margin={0}
                  marginInline={0}
                  marginBlock={0}
                  style={{ marginInlineStart: '0' }}
                  padding={0}
                  color={mode(
                    buttonId === action.label ? 'red.900' : '#1a1b1c',
                    'teal'
                  )}
                  // bg={buttonId === action.label ? '#1a1b1c' : '#fff'}
                  _hover={{
                    borderBottom: '1px solid #1a1b1c',
                  }}
                  _pressed={{
                    borderLeft: '1px solid #1a1b1c',
                    borderRight: '1px solid #1a1b1c',
                  }}
                  _active={{
                    transition: 'all .3s ease .1s',
                    // boxShadow: 'inset 0px -60px 0px 0px #1a1b1c',

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
                  _focus={{
                    boxShadow: 0,
                  }}
                  overflow="hidden"
                  aria-label={action.label}
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
                        borderColor: '#000',
                        backgroundColor: '#000',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                      }}
                      border={['1px solid']}
                      borderColor="#fff"
                      // bg="#000"
                      borderRadius="0%"
                    />
                  )}
                  {action.label}
                </Button>
              </>
            ))}
          </HStack>
        </Flex>
        {/* search bar goes here */}
      </AnimateSharedLayout>
    </>
  );
};

export default SubNav;
