import React from 'react';

import {
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

interface SnippetQueryTableProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  tags: string;
  setTags: React.Dispatch<React.SetStateAction<string>>;
}

export const SnippetQueryTable: React.FC<SnippetQueryTableProps> = ({
  searchText,
  setSearchText,
  language,
  setLanguage,
  tags,
  setTags,
}) => (
  <>
    <Table size="sm">
      <TableCaption>Search Results Meta Data</TableCaption>
      <Thead>
        <Tr>
          <Th colspan={2}> Search Data</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Search Query</Td>
          <Td alignItems="center" textAlign="right">
            {searchText}
            {searchText && (
              <ResetDataButton onClick={() => setSearchText('')} />
            )}
          </Td>
        </Tr>
        <Tr>
          <Td>By Language</Td>
          <Td textAlign="right">
            {language}
            {language && (
              <ResetDataButton onClick={() => setLanguage('')} />
            )}
          </Td>
        </Tr>
        <Tr>
          <Td>By Tag</Td>
          <Td textAlign="right">
            {tags}
            {tags && <ResetDataButton onClick={() => setTags('')} />}
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
