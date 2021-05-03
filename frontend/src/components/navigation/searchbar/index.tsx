/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-console */
import React from 'react';
import {
  Flex,
  Button,
  HStack,
  useColorModeValue as mode,
  useBoolean,
  useMediaQuery,
  Heading,
} from '@chakra-ui/react';

import { MdArrowDropDown } from 'react-icons/md';

import {
  MotionBox,
  MotionInput,
  MotionSelect,
  MotionButton,
} from '../../shared/motion-box';
import { SelectInput } from '../../snippet/crud/select-input';
import { TextInput } from '../../snippet/crud/text-search-input';
import { LANGUAGES } from '../../../constants/languages.constants';

import { BrandButton } from '../../shared/brand-button';

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
  heading?: string;
  children?: React.ReactNode;
}> = ({
  searchText,
  onSearchTextChange,
  language,
  onLanguageChange,
  tags,
  onTagsChange,
  allTags,
  resetAll,
  heading,
  children,
}) => {
  const languages = [{ value: '', label: 'All' }, ...LANGUAGES];
  const [open, setOpen] = React.useState(0);
  const [baseSm, baseMd] = useMediaQuery([
    '(min-width: 30em)',
    '(max-width: 58em)',
  ]);

  const InputArray = [
    <TextInput
      key="searchInput"
      onFocus={() => setOpen(0)}
      onMouseOver={() => setOpen(0)}
      size="sm"
      fontWeight={600}
      fontSize="15px"
      borderRadius="32px"
      border={['1px solid rgb(235, 236, 237)']}
      transition={['all 0.2s ease-in-out 0s']}
      placeholder="Search"
      value={searchText}
      onChange={onSearchTextChange}
    />,
    <SelectInput
      key="langInput"
      onFocus={() => setOpen(1)}
      onMouseOver={() => setOpen(1)}
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
    />,
    <SelectInput
      key="tagInput"
      onFocus={() => setOpen(2)}
      onMouseOver={() => setOpen(2)}
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
    />,
  ];
  return (
    <>
      <Flex
        id="terciary-header-right"
        height="62px"
        top={{ base: '39px', lg: 0 }}
        zIndex={10}
        position="sticky"
        borderBottom="1px"
        borderColor={mode('rgb(235, 236, 237)', '#252945')}
        bg={mode('#fff', '#141625')}
        maxWidth={{ base: '100vw' }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          pl="10px"
          pr="10px"
        >
          <>
            {baseSm && baseMd && (
              <Heading padding={['8px 16px']} fontSize="lg">
                {heading}
              </Heading>
            )}
            <>
              {InputArray.map((input, i) => (
                <MotionBox
                  key={i}
                  initial="collapsed"
                  animate={open === i ? 'open' : 'collapsed'}
                  variants={{
                    open: { width: 'auto' },
                    collapsed: { width: '100px' },
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                >
                  {!baseSm && input.key === 'searchInput'
                    ? input
                    : baseSm && input}
                </MotionBox>
              ))}
            </>
          </>
          {children}

          <BrandButton onClick={() => resetAll()}> Clear</BrandButton>
        </Flex>
      </Flex>
    </>
  );
};

export default SearchBar;
