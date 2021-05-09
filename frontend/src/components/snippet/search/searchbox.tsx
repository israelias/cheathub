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
  VStack,
  Editable,
  EditableInput,
  EditablePreview,
  Checkbox,
  Switch,
  Divider,
  Select,
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

import { LANGUAGES } from '../../../constants/languages.constants';

import { StyledLabel } from '../crud/form-label';

import { MotionSection } from '../../shared/motion-box';

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
const SearchBox: React.FC<{
  searchText: string;
  onSearchTextChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  language: string;
  onLanguageChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  tags: string;
  onTagsChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  allTags: Options[];
  resetAll: () => void;
}> = ({
  searchText,
  onSearchTextChange,
  language,
  onLanguageChange,
  tags,
  onTagsChange,
  allTags,
  resetAll,
}) => {
  const languages = [{ value: '', label: 'All' }, ...LANGUAGES];
  return (
    <>
      <Box
        borderRadius="10px"
        padding={['0 10px']}
        border={['1px solid #bbb']}
        mt="10px"
        width="100%"
      >
        <AnimatePresence exitBeforeEnter>
          <MotionSection>
            <FormControl pt="10px">
              <StyledLabel label="By Search Param" />
              <Input
                mt="10px"
                type="text"
                borderColor="#f6f6f6"
                fontSize="sm"
                value={searchText}
                onChange={onSearchTextChange}
              />
            </FormControl>

            <FormControl pt="10px">
              <StyledLabel label="By Language" />
              <Select
                mt="10px"
                size="sm"
                value={language}
                onChange={onLanguageChange}
              >
                {languages.map((lang: Options) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl pt="10px" id="tags">
              <StyledLabel label="By Tag" />
              <Select
                mt="10px"
                size="sm"
                value={tags}
                onChange={onTagsChange}
              >
                {allTags.map((tag: Options) => (
                  <option key={tag.value} value={tag.value}>
                    {tag.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </MotionSection>
          <HStack>
            <ButtonGroup
              variant="outline"
              spacing="8"
              alignSelf="center"
              padding={['20px 10px']}
            >
              <Button
                onClick={() => {
                  resetAll();
                }}
              >
                Clear
              </Button>
            </ButtonGroup>
          </HStack>
        </AnimatePresence>
      </Box>
    </>
  );
};

export default SearchBox;
