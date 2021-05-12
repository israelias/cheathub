import * as React from 'react';

import {
  ButtonGroup,
  FormControl,
  Input,
  FormHelperText,
  Box,
  HStack,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { BrandButton } from '../shared/brand-button';

import { MotionBox } from '../shared/motion';

import { InputUsername, InputEmail, InputPassword } from './inputs';

const MotionBar = motion(Box);

/**
 * The general signin/signup form.
 *
 * Selected by `_id`.
 * CRUD operations begin from this component tree.
 * @file defines the frontend ui for user authentication.
 * @date 2021-05-03
 */
const RegistrationForm: React.FC<{
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  returning: boolean;
  setReturning: React.Dispatch<React.SetStateAction<boolean>>;
  handleSignIn: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
}> = ({
  username,
  setUsername,
  loading,
  handleSignIn,
  email,
  setEmail,
  password,
  setPassword,
  returning,
  setReturning,
}) => {
  const inputs = {
    username: (
      <InputUsername username={username} setUsername={setUsername} />
    ),
    email: <InputEmail email={email} setEmail={setEmail} />,
    password: (
      <InputPassword password={password} setPassword={setPassword} />
    ),
  };
  const signin = [inputs.email, inputs.password];
  const signup = [inputs.username, inputs.email, inputs.password];

  return (
    <AnimatePresence exitBeforeEnter>
      <MotionBar
        bg={mode('#fff', '#141625')}
        as="form"
        id="registration"
        onSubmit={handleSignIn}
        borderWidth="1px"
        borderRadius="lg"
        border={['1px solid']}
        borderColor={mode('#d8d9da', '#7e88c3')}
        mx="auto"
        my={6}
        width="100%"
        p={['10px']}
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { opacity: 1, height: 'auto' },
          collapsed: { opacity: 0, height: '0' },
        }}
        transition={{
          duration: 0.5,
          ease: [0.04, 0.62, 0.23, 0.98],
        }}
        positionTransition
        position="relative"
        overflow="visible"
        _before={{
          content: `''`,
          borderBottom: '1px solid',
          borderTop: '1px solid',
          borderColor: mode('rgb(235, 236, 237)', '#252945'),
          width: '100%',
          height: '20px',
          display: 'flex',
          position: 'absolute',
          left: 0,

          top: -10,
        }}
        _after={{
          content: `''`,
          borderBottom: '1px solid',
          borderTop: '1px solid',
          borderColor: mode('rgb(235, 236, 237)', '#252945'),
          width: '100%',
          height: '20px',
          display: 'flex',
          position: 'absolute',
          left: 0,

          bottom: -10,
        }}
      >
        <>
          <AnimatePresence>
            {returning
              ? signin.map((sign) => (
                  <AnimatePresence
                    exitBeforeEnter
                    initial={false}
                    key={sign.key}
                  >
                    <MotionBox
                      key={sign.key}
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: 'auto' },
                        collapsed: { opacity: 0, height: '0' },
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      {sign}
                    </MotionBox>
                  </AnimatePresence>
                ))
              : signup.map((sign) => (
                  <MotionBox
                    key={sign.key}
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto' },
                      collapsed: { opacity: 0, height: '0' },
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    {sign}
                  </MotionBox>
                ))}
          </AnimatePresence>
        </>
      </MotionBar>
      <HStack p={['20px 10px']}>
        <BrandButton
          onClick={() => {
            setReturning(!returning);
          }}
        >
          {returning ? 'Switch to Sign up' : 'Switch to Sign in'}
        </BrandButton>

        <BrandButton
          type="submit"
          form="registration"
          isLoading={loading}
          loadingText="Submitting"
        >
          {returning ? 'Sign in' : 'Sign up'}
        </BrandButton>
      </HStack>
    </AnimatePresence>
  );
};

export default RegistrationForm;
