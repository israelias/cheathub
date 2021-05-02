/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
import React from 'react';
import {
  Flex,
  Button,
  HStack,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { MdArrowDropDown } from 'react-icons/md';

import { SelectInput } from '../../snippet/crud/select-input';
import { TextInput } from '../../snippet/crud/text-search-input';
import { LANGUAGES } from '../../../constants/languages.constants';

const SearchBar: React.FC<{
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
      <Flex
        id="terciary-header-right"
        height="62px"
        top={{ base: '39px', lg: 0 }}
        zIndex={10}
        position="sticky"
        borderBottom="1px"
        borderColor="gray.200"
        bg="#fff"
        width="100%"
        maxWidth={{ base: '100vw' }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          pl="10px"
          pr="10px"
        >
          <HStack
            display="flex"
            spacing={8}
            alignItems="center"
            width="100%"
            justifyContent="space-between"
          >
            <TextInput
              size="sm"
              minWidth="140px"
              fontWeight={600}
              fontSize="15px"
              borderRadius="32px"
              border={['1px solid rgb(235, 236, 237)']}
              transition={['all 0.2s ease-in-out 0s']}
              placeholder="Search"
              value={searchText}
              onChange={onSearchTextChange}
            />

            <SelectInput
              size="sm"
              isFullWidth
              variant="outline"
              borderRadius="32px"
              fontWeight={600}
              fontSize="15px"
              name="filter"
              placeholder="Language"
              icon={<MdArrowDropDown />}
              options={languages}
              value={language}
              onChange={onLanguageChange}
            />
            <SelectInput
              size="sm"
              isFullWidth
              variant="outline"
              borderRadius="32px"
              fontWeight={600}
              fontSize="15px"
              name="filter"
              placeholder="Tag"
              icon={<MdArrowDropDown />}
              options={allTags}
              value={tags}
              onChange={onTagsChange}
            />

            <Button
              ml="10px"
              size="sm"
              variant="outline"
              borderRadius="32px"
              onClick={() => resetAll()}
            >
              Clear
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default SearchBar;
