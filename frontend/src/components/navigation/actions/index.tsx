import React from 'react';
import {
  Grid,
  useColorModeValue as mode,
  IconButton,
  Icon,
  Tooltip,
  useMediaQuery,
  useColorMode,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useHistory, useLocation } from 'react-router-dom';
import { AnimateSharedLayout } from 'framer-motion';

import { MotionBox } from '../../shared/motion';
import {
  AddSnippetButton,
  AddCollectionButton,
  BrandButton,
} from '../../shared/brand-button';
import { Logo } from '../../shared/logo';
import { AuthPrompt } from '../../modals/auth-prompt';
import { ACTIONS, MODES } from '../../../constants/actions.constants';
import { useUserContext } from '../../../context/user.context';
import { useProfileData } from '../../../context/profiledata.context';
import AccountMenu from '../account';

/**
 * This is an example of animating between different components in Framer Motion 2.
 *
 * By wrapping a tree with AnimateSharedLayout, children can be given a layoutId.
 *
 * When a component with a layoutId is removed and a new one with the same layoutId
 * is added elsewhere, the new component will animate from the old one.
 *
 * The outline being animated here is four different components, animated like one.
 */

const Actions = () => {
  const history = useHistory();
  const location = useLocation();
  const { toggleColorMode } = useColorMode();
  const { loggedIn, username, handleSignOut } = useUserContext();
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const { loadSnippetsData } = useProfileData();
  const touring = location.pathname === '/registration';
  const collection = location.pathname.includes('/collections');

  return (
    <AnimateSharedLayout>
      <Grid
        templateColumns={{
          base: 'repeat(4, 1fr)',
          lg: 'minmax(0px, 1fr)',
        }}
        templateRows={{ base: 'unset', lg: 'auto' }}
        position={{ base: 'sticky', lg: 'fixed' }}
        top={0}
        width={{ base: 'unset', lg: '100%' }}
        maxWidth={{ base: '100vw', lg: '72px' }}
        // overflow={['hidden auto']}
        padding={{ base: 'unset', lg: '12px 0px 16px' }}
        alignContent="start"
        height={{ base: 'unset', lg: '100%' }}
        bg={mode('#fff', '#141625')}
        zIndex="banner"
        borderRight={{
          base: 'none',
          lg: mode('1px solid #d8d9da', '1px solid #7e88c3'),
        }}
        borderBottom={{
          base: mode('1px solid #d8d9da', '1px solid #7e88c3'),
          lg: 'none',
        }}
      >
        {baseLg && (
          <Grid
            as="span"
            templateColumns={{
              base: 'unset',
              lg: 'minmax(0px, 1fr)',
            }}
            top={{ base: 'unset', lg: 0 }}
            alignContent={{ base: 'unset', lg: 'start' }}
            fontWeight={500}
          >
            <Box
              padding={{
                base: '12px 12px 12px',
                lg: '8px 12px ',
              }}
              position="relative"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Logo dashboard />
            </Box>
          </Grid>
        )}
        {ACTIONS.map((action) => (
          <Tooltip
            key={action.label}
            label={
              loggedIn ? action.label : `Sign in to ${action.auth}`
            }
            placement={baseLg ? 'right' : 'bottom'}
          >
            <Grid
              as="span"
              templateColumns={{
                base: 'unset',
                lg: 'minmax(0px, 1fr)',
              }}
              top={{ base: 'unset', lg: 0 }}
              alignContent={{ base: 'unset', lg: 'start' }}
              fontWeight={500}
            >
              <IconButton
                variant="link"
                colorScheme="gray"
                display="flex"
                flexDirection="column"
                alignItems="center"
                disabled={!loggedIn}
                padding={{
                  base: '12px 12px 12px',
                  lg: '8px 12px ',
                }}
                position="relative"
                size="lg"
                _focus={{
                  boxShadow: 0,
                }}
                aria-label={action.label}
                icon={
                  <Icon
                    as={mode(action.icons.main, action.icons.dark)}
                  />
                }
                onClick={() => {
                  action.label === 'Collections' && username
                    ? history.push(`${action.path}/${username}`)
                    : history.push(action.path);
                }}
              />

              {location.pathname.includes(action.path) && (
                <MotionBox
                  layoutId="outline"
                  initial={true}
                  animate={{ borderColor: mode('#ddd', '#7e88c3') }}
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
            </Grid>
          </Tooltip>
        ))}

        {baseLg && loggedIn && (
          <Flex
            position="absolute"
            width="100%"
            bottom={24}
            alignItems="center"
            flexDirection="column"
            padding={['12px 0px 16px']}
          >
            <AccountMenu dashboard />
          </Flex>
        )}

        {baseLg && (
          <Grid
            position="absolute"
            width="100%"
            bottom={0}
            padding={['12px 0px 16px']}
          >
            {MODES.map((action) => (
              <Tooltip
                key={action.labels.main}
                label={mode(action.labels.main, action.labels.dark)}
                placement="right"
              >
                <Grid as="span">
                  <IconButton
                    variant="link"
                    colorScheme="gray"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    disabled={
                      action.labels.main === 'Sign Out'
                        ? !loggedIn
                        : false
                    }
                    padding={['8px 12px']}
                    position="relative"
                    size="lg"
                    _focus={{
                      boxShadow: 0,
                    }}
                    aria-label={mode(
                      action.labels.main,
                      action.labels.dark
                    )}
                    icon={
                      <Icon
                        as={mode(
                          action.icons.main,
                          action.icons.dark
                        )}
                      />
                    }
                    onClick={
                      action.labels.main === 'Sign Out'
                        ? handleSignOut
                        : toggleColorMode
                    }
                  />
                </Grid>
              </Tooltip>
            ))}
          </Grid>
        )}
      </Grid>
    </AnimateSharedLayout>
  );
};

export default Actions;
