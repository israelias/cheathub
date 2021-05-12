import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Flex,
  useColorModeValue as mode,
  useMediaQuery,
  Heading,
} from '@chakra-ui/react';

import { MdArrowDropDown } from 'react-icons/md';

import { MotionBox } from '../shared/motion';

import { SelectInput, TextInput } from './inputs';

import { LANGUAGES } from '../../constants/languages.constants';

import { BrandButton } from '../shared/brand-button';

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
  const location = useLocation();
  const touring = location.pathname === '/registration';

  const InputArray = [
    <TextInput
      key="searchInput"
      onFocus={() => setOpen(0)}
      onMouseOver={() => setOpen(0)}
      size="sm"
      fontWeight={600}
      fontSize="12px"
      borderRadius="32px"
      color={mode('#0b0914', '#ebeced')}
      border={['1px solid #d8d9da']}
      bg={mode('#fff', '#0b0914')}
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
      fontSize="12px"
      name="filter"
      bg={mode('#fff', '#0b0914')}
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
      fontSize="12px"
      bg={mode('#fff', '#0b0914')}
      name="tag"
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
        borderBottom={['1px solid']}
        borderColor={mode('#d8d9da', '#252945')}
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
              <Heading
                padding={['8px 16px']}
                fontSize={{ base: 'sm', lg: 'lg' }}
              >
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

          <BrandButton hidden={touring} onClick={() => resetAll()}>
            {' '}
            Clear
          </BrandButton>
        </Flex>
      </Flex>
    </>
  );
};

export default SearchBar;
