import React from 'react';
import {
  Flex,
  HStack,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { BrandButton } from '../../shared/brand-button';
/**
 * The Pagination component for the search page.
 *
 * Based on the JSON response object with pagination data from backend search api.
 * @file defines pagination controls for search api.
 * @date 2021-05-03
 */
const Pagination: React.FC<{
  hasPrev: boolean | undefined;
  hasNext: boolean | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}> = ({ hasPrev, hasNext, page, setPage }) => (
  <>
    <Flex
      id="pagination"
      height="62px"
      top={{ base: '39px', lg: 0 }}
      zIndex={10}
      position="sticky"
      width="100%"
      maxWidth={{ base: '100vw' }}
      bg={mode('#fff', '#141625')}
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
          <BrandButton
            disabled={!hasPrev}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </BrandButton>
          <BrandButton
            disabled={!hasNext}
            onClick={() => setPage(page + 1)}
          >
            Next
          </BrandButton>
        </HStack>
      </Flex>
    </Flex>
  </>
);

export default Pagination;
