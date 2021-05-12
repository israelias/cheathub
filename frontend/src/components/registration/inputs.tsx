/* eslint-disable react/require-default-props */
import * as React from 'react';
import { FormControl, Input, FormHelperText } from '@chakra-ui/react';
import { StyledLabel } from '../snippet/crud/form-label';

/**
 * Inputs that make up a registration form.
 *
 * State and setState hooks are passed to activate these components.
 * Auth inputs rely on these UI.
 * @see RegistrationForm
 * @file defines the Registration Form elemts..
 * @date 2021-05-11
 */

/**
 * Username text input.
 */
function InputUsername({
  username,
  setUsername,
  inputRef,
}: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  inputRef?: React.RefObject<HTMLInputElement>;
}) {
  return (
    <FormControl pt="10px" isRequired id="username">
      <StyledLabel label="Username" />
      <Input
        mt="10px"
        type="text"
        borderColor="#f6f6f6"
        fontSize="sm"
        ref={inputRef}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormHelperText hidden>A unique username</FormHelperText>
    </FormControl>
  );
}
/**
 * Email text input.
 */
function InputEmail({
  email,
  setEmail,
}: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
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
      <FormHelperText hidden>
        We don't share you email with anyone.
      </FormHelperText>
    </FormControl>
  );
}
/**
 * Password text input.
 */
function InputPassword({
  password,
  setPassword,
  inputRef,
}: {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  inputRef?: React.RefObject<HTMLInputElement>;
}) {
  return (
    <FormControl pt="10px" isRequired id="password">
      <StyledLabel label="Password" />
      <Input
        mt="10px"
        fontSize="sm"
        type="password"
        name="password"
        ref={inputRef}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormHelperText hidden>Password.</FormHelperText>
    </FormControl>
  );
}

export { InputUsername, InputEmail, InputPassword };
