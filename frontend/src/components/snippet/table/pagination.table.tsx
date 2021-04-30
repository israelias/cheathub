import React from 'react';

import {
  VStack,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from '@chakra-ui/react';
import ResetDataButton from '../../shared/action-button';

interface SnippetPaginationTableProps {
  totalItems: number | undefined;
  perPage: number | undefined;
  currentPage: number | undefined;
}

export const SnippetPaginationTable: React.FC<SnippetPaginationTableProps> = ({
  totalItems,
  perPage,
  currentPage,
}) => (
  <>
    <Table size="sm">
      <TableCaption>Result Data</TableCaption>
      <Thead>
        <Tr>
          <Th colspan={2}> Results</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Total Snippets</Td>
          <Td isNumeric textAlign="right">
            {totalItems}
          </Td>
        </Tr>
        <Tr>
          <Td>On this</Td>
          <Td isNumeric textAlign="right">
            {perPage}
          </Td>
        </Tr>
        <Tr>
          <Td>On the Next</Td>
          <Td isNumeric textAlign="right">
            {currentPage}
          </Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th textAlign="right" colspan={2}>
            {/* Edit Snippet */}
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  </>
);
