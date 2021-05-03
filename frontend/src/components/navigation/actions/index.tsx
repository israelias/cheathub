/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import {
  Grid,
  useColorModeValue as mode,
  IconButton,
  Icon,
  Tooltip,
} from '@chakra-ui/react';

import {
  RouteComponentProps,
  Link as RouterLink,
  useHistory,
} from 'react-router-dom';

import { AnimateSharedLayout } from 'framer-motion';
import { ModeSwitch } from '../../shared/mode';

import { MotionBox } from '../../shared/motion-box';

import { ACTIONS } from '../../../constants/paths.constants';

import { useUserContext } from '../../../context/user.context';

import { LogoutRequest } from '../../../lib/fetcher';

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

const colors = ['#d4825c', '#d67968', '#aa647c', '#786e89'];

const Actions = () => {
  const [selected, setSelected] = useState(colors[0]);
  const history = useHistory();
  const {
    username,
    accessToken,
    setLoggedIn,
    setAccessToken,
    setUsername,
  } = useUserContext();

  return (
    <AnimateSharedLayout>
      <Grid
        templateColumns={['minmax(0px, 1fr)']}
        templateRows={['auto']}
        position="fixed"
        top={0}
        width="100%"
        maxWidth="72px"
        overflow={['hidden auto']}
        padding={['12px 0px 16px']}
        alignContent="start"
        height="100%"
        bg={mode('#fff', '#141625')}
        borderRight={['1px solid']}
        borderColor={mode('#ddd', '#7e88c3')}
      >
        {ACTIONS.map((action) => (
          <Tooltip
            key={action.label}
            label={action.label}
            placement="right"
          >
            <Grid
              as="span"
              templateColumns={['minmax(0px, 1fr)']}
              top={0}
              alignContent="start"
              fontWeight={500}
            >
              <IconButton
                variant="link"
                colorScheme="gray"
                display="flex"
                flexDirection="column"
                alignItems="center"
                padding={['8px 12px']}
                position="relative"
                size="lg"
                aria-label={action.label}
                _focus={{
                  boxShadow: 0,
                }}
                icon={<Icon as={action.icon} />}
                onClick={() => {
                  setSelected(action.label);
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

              {selected === action.label && (
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
        <Tooltip label="Toggle Mode" placement="right">
          <Grid as="span">
            <ModeSwitch
              variant="link"
              colorScheme="gray"
              display="flex"
              flexDirection="column"
              alignItems="center"
              padding={['8px 12px']}
              position="relative"
              _focus={{
                boxShadow: 0,
              }}
            />
          </Grid>
        </Tooltip>
      </Grid>
    </AnimateSharedLayout>
  );
};

export default Actions;
