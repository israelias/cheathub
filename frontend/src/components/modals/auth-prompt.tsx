import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Box,
  Button,
  FormControl,
  Input,
  FormLabel,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { useUserContext } from '../../context/user.context';
import { BrandButton } from '../shared/brand-button';
import RegistrationForm from '../registration';
import {
  InputUsername,
  InputEmail,
  InputPassword,
} from '../registration/inputs';

export const AuthPrompt: React.FC<{
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
}> = ({ isOpen, onOpen, onClose }) => {
  const initialRef = React.useRef<HTMLInputElement>(null);
  const finalRef = React.useRef<HTMLButtonElement>(null);
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    returning,
    setReturning,
    loading,
    handleSignIn,
  } = useUserContext();
  return (
    <>
      <Modal
        motionPreset="scale"
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        returnFocusOnClose
      >
        <ModalOverlay />
        <ModalContent
          bg={mode('#fff', '#141625')}
          border={['1px solid']}
          borderColor={mode('#bbb', '#7e88c3')}
          p="10px"
          borderRadius="10px"
          borderWidth="1px"
        >
          <ModalHeader
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            height="50px"
            borderRadius="10px"
            fontSize="md"
            mt="20px"
            ml="20px"
            mr="20px"
            cursor="normal"
            bg={mode('#f6f6f6', '#252945')}
            p={['10px']}
            borderColor={mode('#bbb', '#7e88c3')}
          >
            It seems you have been logged out.{' '}
            <ModalCloseButton mr="20px" mt="28px" />
          </ModalHeader>
          <ModalBody>
            <RegistrationForm
              username={username}
              setUsername={setUsername}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              returning={returning}
              loading={loading}
              setReturning={setReturning}
              handleSignIn={handleSignIn}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
