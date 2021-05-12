import * as React from 'react';

import {
  Flex,
  Heading,
  IconButton,
  Button,
  ButtonGroup,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Box,
  HStack,
  useMediaQuery,
  GridItem,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useBoolean,
  Tooltip,
  useClipboard,
  VStack,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import {
  CheckIcon,
  InfoIcon,
  WarningIcon,
  CopyIcon,
  AddIcon,
  CloseIcon,
  LinkIcon,
  EditIcon,
  MinusIcon,
} from '@chakra-ui/icons';

import { AnimatePresence, motion } from 'framer-motion';

export const DeleteModal: React.FC<{
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  account?: boolean;
  snippet?: boolean;
  collection?: boolean;
  title?: string;
}> = ({ account, snippet, collection, title, alert, setAlert }) => {
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const closeAlert = () => setAlert(false);

  const deleteSnippet = {
    formId: 'delete-snippet',
    heading: 'Delete Snippet?',
    message: `Are you sure you want to delete ${title}? You can't undo this action.`,
  };

  const deleteCollection = {
    formId: 'delete-collection',
    heading: 'Delete Collection?',
    message: `Are you sure you want to delete ${title}? You can't undo this action.`,
  };

  const deleteAccount = {
    formId: 'delete-account',
    heading: 'Delete Account?',
    message:
      "Are you sure you want to delete your account? You can't undo this action.",
  };

  return (
    <>
      <AlertDialog
        motionPreset="scale"
        isOpen={alert}
        leastDestructiveRef={cancelRef}
        onClose={closeAlert}
        isCentered
        returnFocusOnClose
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            bg={mode('#fff', '#141625')}
            border={['1px solid']}
            borderColor={mode('#9992b6', '#b6b1cb')}
            p="10px"
            borderRadius="10px"
          >
            <Box
              bg={mode('#fafafa', '#0b0914')}
              border={['1px solid #bbb']}
              p="10px"
              borderRadius="10px"
            >
              <AlertDialogHeader
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                height="50px"
                borderRadius="10px"
                cursor="default"
                bg={mode('#f6f6f6', '#252945')}
                p={['0 10px']}
                border={['1px solid']}
                borderColor={mode('#7e88c3', '#786e89')}
              >
                {account
                  ? deleteAccount.heading
                  : collection
                  ? deleteCollection.heading
                  : snippet
                  ? deleteSnippet.heading
                  : 'Delete?'}
                <WarningIcon />
              </AlertDialogHeader>

              <AlertDialogBody height="50px" p={0.5} m="10px">
                {account
                  ? deleteAccount.message
                  : collection
                  ? deleteCollection.message
                  : snippet
                  ? deleteSnippet.message
                  : "Are you sure you want to delete? You can't undo this action."}
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  variant="outline"
                  _hover={{
                    bg: mode('#f5f2f0', '#373B53'),
                  }}
                  ref={cancelRef}
                  onClick={closeAlert}
                >
                  Cancel
                </Button>
                <Button
                  form={
                    account
                      ? deleteAccount.formId
                      : collection
                      ? deleteCollection.formId
                      : snippet
                      ? deleteSnippet.formId
                      : ''
                  }
                  type="submit"
                  variant="outline"
                  borderColor="#ff5470"
                  _hover={{
                    bg: mode('#f5f2f0', '#373B53'),
                    color: mode('#ff5470', '#ff5470'),
                  }}
                  color="red"
                  onClick={closeAlert}
                  ml={3}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </Box>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
