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
} from '@chakra-ui/react';
import { useUserContext } from '../../context/user.context';

export const SignInPrompt: React.FC<{
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}> = ({ isOpen, onOpen, onClose }) => {
  const history = useHistory();
  const { handleSignIn } = useUserContext();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const initialRef = React.useRef<HTMLInputElement>(null);
  const finalRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Modal
        motionPreset="scale"
        initialFocusRef={initialRef}
        // finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        returnFocusOnClose
      >
        <ModalOverlay />
        <ModalContent
          bg="#fff"
          border={['1px solid #bbb']}
          p="10px"
          borderRadius="10px"
        >
          <form onSubmit={handleSignIn}>
            <Box
              bg="#fff"
              border={['1px solid #bbb']}
              p="10px"
              borderRadius="10px"
            >
              <ModalHeader
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                height="50px"
                borderRadius="10px"
                cursor="normal"
                bg="#f6f6f6"
                p={['0 10px']}
                borderBottom={['1px solid #f6f6f6']}
              >
                You've been signed out. <ModalCloseButton />
              </ModalHeader>

              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    ref={initialRef}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  variant="outline"
                  type="submit"
                  colorScheme="blue"
                  mr={3}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    onClose();
                    history.push('/');
                  }}
                >
                  Stay Signed out
                </Button>
              </ModalFooter>
            </Box>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
