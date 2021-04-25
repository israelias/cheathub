/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Select,
  Link,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  AddIcon,
  MinusIcon,
} from '@chakra-ui/icons';
import { AnimatePresence } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import cn from 'classnames';

import { TimeAgo } from '../shared/time';
import { MotionBox } from '../shared/motion-box';

import { CardButton } from '../card/view';

import './styles.css';

/**
 * Frontend user dashboard endpoint that represents an array of collections from an HTTP get request.
 *
 * @file defines Collections page route
 * @since 2021-04-08
 * @tutorial https://codesandbox.io/s/framer-motion-accordion-vmj0n?file=/src/Example.tsx:366-489
 */

interface CollectionTableProps {
  snippet: Snippet;
  collection: Collection;
  collections: Collection[];
  setExpandedCollection: React.Dispatch<React.SetStateAction<number>>;
  i: number;
  setCollectionId: React.Dispatch<React.SetStateAction<string>>;
}

export const CollectionTable: React.FC<CollectionTableProps> = ({
  snippet,
  collection,
  collections,
  setCollectionId,
  setExpandedCollection,
  i,
}) => {
  const [sharedCols, setSharedCols] = React.useState<
    Array<Collection>
  >([collection]);

  // const allCols: Array<Collection> = [collection];

  // const allCols: any = [];

  // React.useEffect(() => {
  //   if (collections) {
  //     collections.forEach((col) => {
  //       col.snippets.forEach((snip) => {
  //         if (snip._id === snippet._id) {
  //           allCols.push(col);

  //           if (col.name !== allCols[allCols.length - 1].name) {
  //             allCols.push(col);
  //           }
  //         }
  //       });
  //     });
  //     setSharedCols(allCols);
  //     console.log('totes', allCols);
  //   }
  // }, [allCols]);

  return (
    <Table size="sm">
      <Thead>
        <Tr>
          <Th
            colspan={2}
            _before={{
              content: `">"`,
              position: 'absolute',
              left: '16px',
            }}
          >
            {' '}
            {snippet.title}
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>lang</Td>
          <Td textAlign="right">{snippet.language}</Td>
        </Tr>
        <Tr>
          <Td>also in</Td>
          <Td textAlign="right">
            <Select>
              {sharedCols.length > 0 &&
                sharedCols.map((col: any, index: number) => (
                  <option
                    key={`${index}-option-collection-${col._id}-snippet-${snippet._id}`}
                    onChange={() => setCollectionId(col._id)}
                    value={col.name}
                  >
                    {col.name}
                  </option>
                ))}
            </Select>
          </Td>
        </Tr>
        <Tr>
          <Td>last modified</Td>
          <Td isNumeric textAlign="right">
            <TimeAgo date={snippet.updatedOn} />
          </Td>
        </Tr>
        <Tr>
          <Td>source</Td>
          <Td textAlign="right">
            <Link
              href={snippet.source}
              target="_blank"
              noReferer="true"
              isTruncated
            >
              {snippet.source.slice(0, 12)}
            </Link>
          </Td>
        </Tr>
        <Tr>
          <Td>file</Td>
          <Td textAlign="right">{snippet.filename}</Td>
        </Tr>
        <Tr>
          <Td>likes</Td>
          <Td isNumeric>
            {snippet.likedBy.length > 0 ? snippet.likedBy.length : 0}
          </Td>
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
  );
};
