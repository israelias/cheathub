import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Link,
} from '@chakra-ui/react';

import { TimeAgo } from '../../shared/time';

interface SnippetDataTableProps {
  title: string;
  language: string;
  updatedOn: string;
  source: string;
  filename: string;
  likedBy: string[];
}

export const SnippetDataTable: React.FC<SnippetDataTableProps> = ({
  title,
  language,
  updatedOn,
  source,
  filename,
  likedBy,
}) => (
  <>
    <Table size="sm">
      <Thead>
        <Tr>
          <Th colspan={2}> {title}</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>lang</Td>
          <Td textAlign="right">{language}</Td>
        </Tr>
        <Tr>
          <Td>also in</Td>
          <Td textAlign="right">'text'</Td>
        </Tr>
        <Tr>
          <Td>last modified</Td>
          <Td isNumeric textAlign="right">
            {updatedOn && <TimeAgo date={updatedOn} />}
          </Td>
        </Tr>
        <Tr>
          <Td>source</Td>
          <Td textAlign="right">
            <Link
              href={source}
              target="_blank"
              noReferer="true"
              isTruncated
            >
              {source.slice(0, 12)}
            </Link>
          </Td>
        </Tr>
        <Tr>
          <Td>file</Td>
          <Td textAlign="right">{filename}</Td>
        </Tr>
        <Tr>
          <Td>likes</Td>
          <Td isNumeric>{likedBy.length > 0 ? likedBy.length : 0}</Td>
        </Tr>
      </Tbody>
      <Tfoot>
        <Tr>
          <Th textAlign="right" colspan={2}>
            Edit Snippet
          </Th>
        </Tr>
      </Tfoot>
    </Table>
  </>
);
