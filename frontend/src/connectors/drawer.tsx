import React from 'react';

import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerCloseButton,
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
    placement="right"
    onClose={onClose}
    finalFocusRef={buttonRef}
  >
    <DrawerOverlay>
      <DrawerContent bg="transparent">
        <>
          <DrawerHeader>{heading}</DrawerHeader>
          <DrawerBody bg="transparent">
            <Box mt="39px" paddingTop="10px">
              {children}
            </Box>
          </DrawerBody>
        </>
        <DrawerCloseButton />
      </DrawerContent>
    </DrawerOverlay>
  </Drawer>
);
