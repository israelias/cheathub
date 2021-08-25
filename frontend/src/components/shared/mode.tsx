import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ModeSwitch = (
  props: Omit<IconButtonProps, 'aria-label'>
) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      {...props}
      aria-label={`Switch to ${text} mode`}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      size="md"
      fontSize="lg"
    />
  );
};
