import React from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import {
  FormLabel,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  VStack,
  HStack,
  Button,
  IconButton,
  Link,
  Icon,
  useBoolean,
  useClipboard,
  useColorModeValue as mode,
  ButtonGroup,
} from '@chakra-ui/react';
import { CheckIcon, CloseIcon, CopyIcon } from '@chakra-ui/icons';
import {
  GoPlus,
  GoPlusSmall,
  GoDash,
  GoLinkExternal,
  GoLink,
  GoPencil,
  GoDiffIgnored,
  GoDiffModified,
} from 'react-icons/go';
import { TimeAgo } from '../../shared/time';
import {
  MotionSection,
  MotionHeader,
  MotionBox,
  MotionFooter,
  MotionAside,
  MotionUl,
  MotionLi,
  MotionP,
} from '../../shared/motion-box';

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
      ml="8px"
      fontWeight="light"
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

export const Description: React.FC<{ description: string }> = ({
  description,
}) => (
  <MotionP
    p="10px"
    fontSize="14px"
    fontWeight="normal"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
    }}
    d="flex"
    alignItems="baseline"
  >
    {description}
  </MotionP>
);

export const TagList: React.FC<{
  tags: string[];
  editing: boolean;
  collections?: boolean;
  setTags: (value: React.SetStateAction<string>) => void;
}> = ({ tags, editing, collections, setTags }) => (
  <MotionUl listStyleType="none" display="flex">
    {editing
      ? tags.map((tag) => (
          <MotionLi
            key={`form-${tag}`}
            color="gray.600"
            fontSize="sm"
            cursor="default"
            pr="12px"
            _before={{
              content: `'+ '`,
              fontWeight: 'bold',
            }}
          >
            {tag}
          </MotionLi>
        ))
      : tags.slice(0, 3).map((tag) => (
          <MotionLi
            key={`form-${tag}`}
            color="gray.600"
            fontSize="sm"
            cursor={collections ? 'default' : 'pointer'}
            pr="12px"
            _before={{
              content: `'+ '`,
              fontWeight: 'bold',
            }}
            _hover={{
              textDecoration: collections ? 'none' : 'underline',
            }}
            onClick={collections ? () => {} : () => setTags(tag)}
          >
            {tag}
          </MotionLi>
        ))}
  </MotionUl>
);

export const TagMenu: React.FC<{
  tags: string[];
  editing: boolean;
  collections?: boolean;
  setTags: (value: React.SetStateAction<string>) => void;
}> = ({ tags, editing, collections, setTags }) => (
  <Menu closeOnSelect={true}>
    {({ isOpen }) => (
      <>
        <MenuButton
          as={Button}
          isActive={isOpen}
          variant="link"
          color="gray.600"
          fontWeight="light"
          fontSize="sm"
          size="sm"
          leftIcon={
            <Icon fontSize="12px" as={isOpen ? GoDash : GoPlus} />
          }
        >
          All Tags
        </MenuButton>
        <MenuList minWidth="240px">
          {tags.map((tag: string) => (
            <MenuItem
              key={tag}
              value={tag}
              disabled={editing || collections}
              onClick={() => setTags(tag)}
            >
              {tag}
            </MenuItem>
          ))}
        </MenuList>
      </>
    )}
  </Menu>
);

export const PostUserData: React.FC<{
  username: string;
  addedBy: string;
  addedOn: string;
}> = ({ username, addedBy, addedOn }) => (
  <Box
    as="span"
    _before={{
      content: `': '`,
      fontSize: 'sm',
      fontWeight: 'bold',
    }}
  >
    {addedBy === username ? 'you' : addedBy}
    <Box
      as="span"
      ml="2"
      color="gray.600"
      fontSize="sm"
      _after={{ content: `'.'` }}
    >
      <TimeAgo date={addedOn} />
    </Box>
  </Box>
);

export const PostFaveData: React.FC<{
  likedBy: string[];
}> = ({ likedBy }) => (
  <Tooltip
    closeDelay={500}
    size="sm"
    variant="outline"
    placement="right-end"
    gutter={20}
    // bg={mode('#f6f6f6', '#f6f6f6')}
    label={
      <VStack as="ul">
        {likedBy.map((like, i) => (
          <Box as="li" fontSize="12px" key={`${i}--${like}`}>
            {like}
          </Box>
        ))}
      </VStack>
    }
  >
    <Box
      as="span"
      ml="2"
      color="gray.600"
      fontSize="sm"
      _before={{
        content: `'/ '`,
        color: 'blue.400',
        fontWeight: 'bold',
      }}
    >
      {likedBy.length} likes
    </Box>
  </Tooltip>
);

export const SourceButton: React.FC<{ source: string }> = ({
  source,
}) => (
  <Button
    display="flex"
    // alignItems="center"
    // variant="link"
    variant="outline"
    as={Link}
    size="xs"
    // mr="-px"
    fontWeight="light"
    aria-label="Source"
    href={source}
    target="_blank"
    rel="noreferrer"
    rightIcon={<Icon fontSize="12px" as={GoLinkExternal} />}
  >
    Source
  </Button>
);

export const EditButton: React.FC<{
  snipId: string;
  collections?: boolean;
}> = ({ snipId, collections }) =>
  collections ? (
    <Button
      display="flex"
      // alignItems="center"
      padding="10px"
      justifyContent="space-between"
      variant="outline"
      as={RouterLink}
      fontSize="sm"
      fontWeight="medium"
      color="gray.600"
      bg={mode('#fff', '#141625')}
      _hover={{
        bg: mode('#f6f6f6', '#252945'),
      }}
      to={`/snippets/${snipId}`}
      rightIcon={<Icon fontSize="10px" as={GoPencil} />}
    >
      Edit this snippet
    </Button>
  ) : (
    <Button
      display="flex"
      // alignItems="center"
      justifyContent="space-between"
      variant="outline"
      as={RouterLink}
      size="xs"
      mr="-px"
      ml="8px"
      fontWeight="light"
      to={`/snippets/${snipId}`}
      rightIcon={<Icon fontSize="10px" as={GoPencil} />}
    >
      Edit
    </Button>
  );

export const FaveButton: React.FC<{
  faveSnippet?: boolean;
  collections?: boolean;
  snipId: string;
  handleFave?: (snipId: string) => Promise<void>;
  likedBy: string[];
  username: string;
}> = ({
  faveSnippet,
  collections,
  snipId,
  handleFave,
  likedBy,
  username,
}) =>
  collections ? (
    <Button
      type="submit"
      variant="outline"
      padding="10px"
      width="100%"
      justifyContent="space-between"
      fontSize="sm"
      fontWeight="medium"
      bg={mode('#fff', '#141625')}
      _hover={{
        bg: mode('#f6f6f6', '#252945'),
        borderRadius: '6px',
      }}
      rightIcon={
        <Icon fontSize="10px" as={faveSnippet ? GoDash : GoPlus} />
      }
      onClick={() => (handleFave ? handleFave(snipId) : {})}
    >
      {!faveSnippet && likedBy.includes(username)
        ? 'Remove from favorites'
        : 'Add to favorites'}
    </Button>
  ) : (
    <Button
      type="submit"
      variant="outline"
      lineHeight="1"
      size="xs"
      mr="-px"
      ml="8px"
      fontWeight="light"
      rightIcon={
        <Icon fontSize="10px" as={faveSnippet ? GoDash : GoPlus} />
      }
      onClick={() => (handleFave ? handleFave(snipId) : {})}
    >
      {!faveSnippet && likedBy.includes(username) ? 'Unfave' : 'Fave'}
    </Button>
  );
