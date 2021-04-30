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
import { loginReload } from '../../lib/fetcher';
import { useUserContext } from '../../context/user.context';

interface SignInPromptProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const SignInPrompt: React.FC<SignInPromptProps> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  // const { onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const {
    setAccessToken,
    setLoggedIn,
    setUsername,
  } = useUserContext();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [message, setMessage] = React.useState('');
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
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await loginReload({
                  body: { email, password },
                  setAccessToken,
                  setLoggedIn,
                  setUsername,
                }).then((res) => {
                  if (res) {
                    onClose();
                  }
                });
              } catch (err) {
                setMessage(err.message);
              }
            }}
          >
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
