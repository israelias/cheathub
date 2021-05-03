import React from 'react';

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
  Flex,
  Box,
  Stack,
} from '@chakra-ui/react';

export const SidePanel: React.FC<{
  heading: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  children?: React.ReactNode;
}> = ({ heading, isOpen, onClose, buttonRef, children }) => (
  <Drawer
    isOpen={isOpen}
    placement="right"
    onClose={onClose}
    finalFocusRef={buttonRef}
  >
    <DrawerOverlay>
      <DrawerContent bg="transparent">
        <>
          <DrawerHeader>{heading}</DrawerHeader>
          <DrawerBody bg="transparent">
            {/* <Stack spacing="24px"> */}
            <Box mt="39px" paddingTop="10px">
              {children}
            </Box>
            {/* </Stack> */}
          </DrawerBody>
          {/* <Flex
            mt="39px"
            height="100%"
            overflow="scroll"
            p="10px"
            flexDirection="column"
          >
            <Box paddingTop="10px">{children}</Box>
          </Flex> */}
        </>
        <DrawerCloseButton />
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
);
