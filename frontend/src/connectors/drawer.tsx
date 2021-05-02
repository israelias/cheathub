import React from 'react';

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  Flex,
  Box,
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
    placement="left"
    onClose={onClose}
    finalFocusRef={buttonRef}
  >
    <DrawerOverlay>
      <DrawerContent>
        <>
          <Flex
            height="100%"
            overflow="scroll"
            p="10px"
            flexDirection="column"
          >
            <DrawerHeader>{heading}</DrawerHeader>
            <Box paddingTop="10px">{children}</Box>
          </Flex>
        </>
        <DrawerCloseButton />
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
);
