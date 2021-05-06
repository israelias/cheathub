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
  title: string;
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ title, alert, setAlert }) => {
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const closeAlert = () => setAlert(false);

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
            bg="#fff"
            border={['1px solid #bbb']}
            p="10px"
            borderRadius="10px"
          >
            <Box
              bg="#fff"
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
                cursor="normal"
                bg="#f6f6f6"
                p={['0 10px']}
                borderBottom={['1px solid #f6f6f6']}
              >
                Delete Snippet?
                <WarningIcon />
              </AlertDialogHeader>

              <AlertDialogBody height="50px" p={0.5} m="10px">
                Are you sure you want to delete {title}? You can't
                undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  variant="outline"
                  ref={cancelRef}
                  onClick={closeAlert}
                >
                  Cancel
                </Button>
                <Button
                  form="delete"
                  type="submit"
                  variant="outline"
                  colorScheme="red"
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
