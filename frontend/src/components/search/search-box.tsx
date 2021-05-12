import * as React from 'react';

import {
  Button,
  ButtonGroup,
  FormControl,
  Input,
  Box,
  HStack,
  Select,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { AnimatePresence, motion } from 'framer-motion';

import { LANGUAGES } from '../../constants/languages.constants';

import { StyledLabel } from '../snippet/crud/form-label';

import { MotionSection } from '../shared/motion';

const MotionBar = motion(Box);

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
    <AnimatePresence exitBeforeEnter>
      <MotionBar
        bg={mode('#fff', '#141625')}
        as="article"
        borderWidth="1px"
        borderRadius="lg"
        border={['1px solid']}
        borderColor={mode('#9992b6', '#b6b1cb')}
        // overflow="hidden"
        mx="auto"
        my={6}
        width="100%"
        p={['10px']}
        initial="collapsed"
        animate="open"
        exit="collapsed"
        variants={{
          open: { opacity: 1, height: 'auto' },
          collapsed: { opacity: 0, height: '0' },
        }}
        transition={{
          duration: 0.5,
          ease: [0.04, 0.62, 0.23, 0.98],
        }}
        positionTransition
        position="relative"
        overflow="visible"
        _before={{
          content: `''`,
          borderBottom: '1px solid',
          borderTop: '1px solid',
          borderColor: mode('rgb(235, 236, 237)', '#252945'),
          width: '100%',
          height: '20px',
          display: 'flex',
          position: 'absolute',
          left: 0,
          // marginBottom: 16,
          top: -10,
        }}
        _after={{
          content: `''`,
          borderBottom: '1px solid',
          borderTop: '1px solid',
          borderColor: mode('rgb(235, 236, 237)', '#252945'),
          width: '100%',
          height: '20px',
          display: 'flex',
          position: 'absolute',
          left: 0,
          // marginBottom: 16,
          bottom: -10,
        }}
      >
        <AnimatePresence exitBeforeEnter>
          <MotionSection>
            <FormControl pt="10px">
              <StyledLabel label="By Search Param" />
              <Input
                mt="10px"
                type="text"
                // variant="flushed"
                borderColor={mode('#ff5470', '#fde24f')}
                focusBorderColor={mode('#ff5470', '#fde24f')}
                bg={mode('#fafafa', '#0b0914')}
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
                variant="flushed"
                iconColor={mode('#ff5470', '#fde24f')}
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
                variant="flushed"
                iconColor={mode('#ff5470', '#fde24f')}
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
      </MotionBar>
    </AnimatePresence>
  );
};

export default SearchBox;
