/* eslint-disable no-console */
import React from 'react';
import {
  Box,
  Flex,
  Heading,
  useColorModeValue as mode,
  Input,
  Select,
  Button,
  HStack,
} from '@chakra-ui/react';

import SearchBar from '../searchbar';
import SubNav from '../subnav';

interface Props {
  children: React.ReactNode;
}

export const Content: React.FC<Props> = ({ children }) => {
  const wtf = 'wtf';
  const [buttonId, setButtonId] = React.useState('');
  const [filterBy, setFilterBy] = React.useState<
    'latest' | 'popular'
  >('latest');

  const onFilterByChange = (val: 'latest' | 'popular') => {
    console.log(val);
    setFilterBy(val);
  };
  return (
    <>
      <Flex
        as="section"
        flexDirection="column"
        bg="main.bgColor"
        borderBottom="1px"
        borderColor="yellow.200"
      >
        <SubNav />
        <SearchBar
          filterBy={filterBy}
          setFilterBy={() => onFilterByChange}
        />

        <>{children}</>
      </Flex>
    </>
  );
};
