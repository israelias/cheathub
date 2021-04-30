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
import { SimpleSelect } from '../../shared/select-simple';
import { LANGUAGES } from '../../../constants/languages.constants';

interface Props {
  language: string;
  onLanguageChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  tags: string;
  onTagsChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  searchText: string;
  // onSearchTextChange: (value: string) => void;
  onSearchTextChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  // onSearchTextChange: React.Dispatch<React.SetStateAction<string>>;
  // onSearchTextChange: (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => void;
  // onSearchTextChange: (value: React.SetStateAction<string>) => void;
  allTagOptions: Array<string>;
  setAllTagOptions?: React.Dispatch<React.SetStateAction<string>>;
  resetAll: () => void;
}

const SearchBar: React.FC<Props> = ({
  searchText,
  onSearchTextChange,
  language,
  onLanguageChange,
  tags,
  onTagsChange,
  allTagOptions,
  setAllTagOptions,
  resetAll,
}) => {
  const wtf = 'wtf';
  const languages = [{ value: '', label: 'All' }, ...LANGUAGES];
  const [value, setValue] = React.useState('Hello world!');

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
            {/* <Flex justifyContent="space-between"> */}
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
            <SimpleSelect
              size="sm"
              ml="10px"
              variant="outline"
              borderRadius="32px"
              fontWeight={600}
              fontSize="15px"
              placeholder="Tag"
              icon={<MdArrowDropDown />}
              items={allTagOptions}
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
              Reset
            </Button>
            {/* </Flex> */}
          </HStack>
        </Flex>
      </Flex>
      {/* <Flex
        id="terciary-header"
        alignItems="center"
        // justifyContent="space-between"
        // bg={mode('#fff', 'gray.600')}
        // borderBottom="1px"
        borderColor="gray.200"
        height="62px"
        top={0}
        position="sticky"
        pl="10px"
        pr="10px"
      ></Flex> */}
    </>
  );
};

export default SearchBar;
