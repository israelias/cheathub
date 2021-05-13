import React from 'react';
import {
  HStack,
  Button,
  IconButton,
  Icon,
  useClipboard,
  useColorModeValue as mode,
  ButtonGroup,
} from '@chakra-ui/react';
import { CheckIcon, CopyIcon } from '@chakra-ui/icons';
import { GoDiffIgnored, GoDiffModified } from 'react-icons/go';

export const ViewerControls: React.FC<{
  value: string;
  lineNumbers: boolean;
  wrapLines: boolean;
  setWrapLines: {
    readonly on: () => void;
    readonly off: () => void;
    readonly toggle: () => void;
  };
  setLineNumbers: {
    readonly on: () => void;
    readonly off: () => void;
    readonly toggle: () => void;
  };
}> = ({
  value,
  lineNumbers,
  wrapLines,
  setLineNumbers,
  setWrapLines,
}) => (
  <HStack>
    <ButtonGroup size="xs" isAttached variant="outline">
      <Button
        onClick={setLineNumbers.toggle}
        mr="-px"
        fontWeight="light"
        bg={mode('#fafafa', '#252945')}
        borderColor={mode('#d8d9da', '#7e88c3')}
        color={mode('#252945', '#fafafa')}
        _hover={{ bg: mode('#f5f2f0', '#373B53') }}
        rightIcon={
          lineNumbers ? (
            <Icon fontSize="12px" as={GoDiffModified} />
          ) : (
            <Icon fontSize="12px" as={GoDiffIgnored} />
          )
        }
      >
        {lineNumbers ? 'Line numbers on' : 'Line numbers off'}
      </Button>

      <Button
        onClick={setWrapLines.toggle}
        mr="-px"
        fontWeight="light"
        bg={mode('#fafafa', '#252945')}
        borderColor={mode('#d8d9da', '#7e88c3')}
        color={mode('#252945', '#fafafa')}
        _hover={{ bg: mode('#f5f2f0', '#373B53') }}
        rightIcon={
          <Icon
            fontSize="10px"
            as={wrapLines ? GoDiffModified : GoDiffIgnored}
          />
        }
      >
        {wrapLines ? 'Line wrap on' : 'Line wrap off'}
      </Button>

      <CopyButton editing value={value} />
    </ButtonGroup>
  </HStack>
);

export const CopyButton: React.FC<{
  editing?: boolean;
  value: string;
}> = ({ editing, value }) => {
  const { hasCopied, onCopy } = useClipboard(value);
  return editing ? (
    <Button
      variant="outline"
      size="xs"
      mr="-px"
      fontWeight="light"
      bg={mode('#fafafa', '#252945')}
      borderColor={mode('#d8d9da', '#7e88c3')}
      color={mode('#252945', '#fafafa')}
      _hover={{ bg: mode('#f5f2f0', '#373B53') }}
      rightIcon={
        hasCopied ? (
          <CheckIcon fontSize="10px" />
        ) : (
          <CopyIcon fontSize="10px" />
        )
      }
    >
      {hasCopied ? 'Copied' : 'Copy'}
    </Button>
  ) : (
    <IconButton
      variant="outline"
      color="gray.400"
      bg="rgb(255,255,255, .3)"
      size="xs"
      aria-label="Copy snippet"
      onClick={onCopy}
      icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
      position="absolute"
      right="36px"
      mt="10px"
    />
  );
};
