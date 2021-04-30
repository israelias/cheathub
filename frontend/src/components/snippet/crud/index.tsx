/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';

import { RouteComponentProps } from 'react-router';

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

import {
  putRequest,
  getRequest,
  postRequest,
  deleteRequest,
  putReload,
  postReload,
} from '../../../lib/fetcher';

import { LANGUAGES } from '../../../constants/languages.constants';

import { SelectInput } from './select-input';
import { TextInput } from './text-search-input';

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

interface OneFormProps {
  snippet: Snippet | undefined;
  editing: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  tags: string;
  setTags: React.Dispatch<React.SetStateAction<string>>;
  source: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  submitting?: boolean;
  deleting: boolean;
  setId?: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleDelete: React.FormEventHandler<HTMLFormElement>;
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
  message: string;
}

/**
 * Frontend private endpoint that represents a single code snippet post.
 * Selected by `_id`.
 * CRUD operations begin from this component tree.
 * @file defines route for one unique Snippet.
 * @date 2021-04-21
 * @param {any} match
 * @param {any} history
 * @return {=>}
 */
const SnippetCrud: React.FC<OneFormProps> = ({
  editing,
  setAlert,
  title,
  setTitle,
  language,
  setLanguage,
  value,
  setValue,
  description,
  setDescription,
  tags,
  setTags,
  source,
  setSource,
  submitting,
  deleting,
  handleSubmit,
  handleDelete,
  handleCancel,
  message,
}) => {
  const languages = [{ value: '', label: 'All' }, ...LANGUAGES];
  return (
    <>
      <Box
        borderRadius="10px"
        padding={['0 10px']}
        border={['1px solid #bbb']}
      >
        <form onSubmit={handleSubmit}>
          <FormControl id="title">
            <FormLabel
              color="gray.600"
              fontWeight="light"
              fontSize="sm"
            >
              Title
            </FormLabel>
            <Input
              type="text"
              borderColor="#f6f6f6"
              variant="flushed"
              height="50px"
              padding={['0 10px']}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormHelperText hidden>Title.</FormHelperText>
          </FormControl>

          <FormControl id="body">
            <FormLabel
              color="gray.600"
              fontWeight="light"
              fontSize="sm"
              height="50px"
            >
              Code Snippet
            </FormLabel>
            <Textarea
              mr="-10px"
              borderRadius={0}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </FormControl>

          <FormControl id="description">
            <FormLabel
              color="gray.600"
              fontWeight="light"
              fontSize="sm"
            >
              Description
            </FormLabel>
            <Input
              type="text"
              borderColor="#f6f6f6"
              variant="flushed"
              height="50px"
              padding={['0 10px']}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormHelperText hidden>Description.</FormHelperText>
          </FormControl>

          <SelectInput
            height="50px"
            padding={['0 10px']}
            variant="flushed"
            label="Language:"
            options={languages}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />

          <FormControl id="tags">
            <FormLabel
              color="gray.600"
              fontWeight="light"
              fontSize="sm"
            >
              Tags
            </FormLabel>
            <Input
              type="text"
              borderColor="#f6f6f6"
              variant="flushed"
              height="50px"
              padding={['0 10px']}
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            <FormHelperText>
              Tags (separated by comma).
            </FormHelperText>
          </FormControl>

          <FormControl id="source">
            <FormLabel
              color="gray.600"
              fontWeight="light"
              fontSize="sm"
            >
              Source
            </FormLabel>
            <Input
              type="text"
              borderColor="#f6f6f6"
              variant="flushed"
              height="50px"
              padding={['0 10px']}
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <FormHelperText hidden>Description.</FormHelperText>
          </FormControl>

          <ButtonGroup
            variant="outline"
            spacing="12"
            alignSelf="center"
            padding={['10px 10px']}
          >
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>

            <Button
              type="submit"
              isLoading={submitting}
              loadingText="Submitting"
            >
              {editing ? 'Update' : 'Add'}
            </Button>
          </ButtonGroup>
        </form>
        {editing && (
          <form id="delete" onSubmit={handleDelete}>
            <Button
              type="button"
              isLoading={deleting}
              loadingText="Deleting"
              onClick={() => setAlert(true)}
            >
              Delete
            </Button>
          </form>
        )}
        {message && (
          <div style={{ color: 'tomato' }}>
            {JSON.stringify(message, null, 2)}
          </div>
        )}
      </Box>
    </>
  );
};

export default SnippetCrud;
