import * as React from 'react';

import {
  ButtonGroup,
  FormControl,
  Input,
  FormHelperText,
  Box,
  HStack,
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';

import { BrandButton } from '../shared/brand-button';
import { StyledLabel } from '../snippet/crud/form-label';
import { MotionForm } from '../shared/motion-box';

/**
 * The general signin/signup form.
 *
 * Selected by `_id`.
 * CRUD operations begin from this component tree.
 * @file defines the frontend ui for user authentication.
 * @date 2021-05-03
 * @param {any} match
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
}) => (
  <>
    <Box
      borderRadius="10px"
      padding={['0 10px']}
      border={['1px solid #bbb']}
      mt="10px"
    >
      <AnimatePresence exitBeforeEnter>
        <MotionForm id="registration" onSubmit={handleSignIn}>
          {!returning && (
            <FormControl pt="10px" isRequired id="tusernameitle">
              <StyledLabel label="Username" />
              <Input
                mt="10px"
                type="text"
                borderColor="#f6f6f6"
                fontSize="sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormHelperText hidden>Username.</FormHelperText>
            </FormControl>
          )}

          <FormControl pt="10px" isRequired id="email">
            <StyledLabel label="Email" />
            <Input
              mt="10px"
              fontSize="sm"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormHelperText hidden>Email.</FormHelperText>
          </FormControl>

          <FormControl pt="10px" isRequired id="password">
            <StyledLabel label="Password" />
            <Input
              mt="10px"
              fontSize="sm"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText hidden>Password.</FormHelperText>
          </FormControl>
        </MotionForm>
        <HStack>
          <ButtonGroup
          // variant="outline"
          // spacing="8"
          // alignSelf="center"
          // padding={['20px 10px']}
          >
            <BrandButton onClick={() => setReturning(!returning)}>
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
          </ButtonGroup>
        </HStack>
      </AnimatePresence>
    </Box>
  </>
);

export default RegistrationForm;
