/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable no-console */

import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  Select,
  Box,
  Text,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { TextInput } from '../../../snippet/crud/text-search-input';
import {
  putRequest,
  getRequest,
  postRequest,
} from '../../../../lib/fetcher';

import { MotionBox } from '../../../shared/motion-box';
import { useUserContext } from '../../../../context/user.context';

import '../../styles.css';

interface CollectionActionProps extends RouteComponentProps {
  allSnippetsData: Snippet[];
  expandedCollection: number;
  setExpandedCollection: React.Dispatch<React.SetStateAction<number>>;
}

const CollectionAction = withRouter(
  ({
    history,
    allSnippetsData,
    expandedCollection,
    setExpandedCollection,
  }: CollectionActionProps) => {
    const { accessToken } = useUserContext();
    const [message, setMessage] = React.useState(null);
    const [name, setName] = React.useState('Your Title');
    const [collection, setCollection] = React.useState<string>('');

    const isOpen = expandedCollection === -1;

    const className = cn('accordion', {
      'accordion--open': isOpen,
      'accordion--next-to-open': expandedCollection - 1 || false,
    });

    const onCollectionChange = (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => {
      const {
        target: { value },
      } = event;
      if (value === '') {
        setCollection('');
      }
      setCollection(value);
    };

    const onNameChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const {
        target: { value },
      } = event;
      if (value === '') {
        setName('');
      }
      setName(value);
    };

    return (
      <>
        <Box className={className}>
          <header onClick={() => setExpandedCollection(-1)}>
            <Box>
              <Text>Add New</Text>
            </Box>

            <Box justifySelf="end">
              {isOpen ? (
                <MinusIcon fontSize="12px" />
              ) : (
                <AddIcon fontSize="12px" />
              )}
            </Box>
          </header>
          <AnimatePresence initial={false}>
            {isOpen && (
              <MotionBox
                as="section"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: { opacity: 1, height: 'auto' },
                  collapsed: { opacity: 0, height: '0' },
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.04, 0.62, 0.23, 0.98],
                }}
              >
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      await postRequest({
                        url: `api/collections`,
                        accessToken,

                        body: {
                          name,
                          snippets: [collection],
                        },
                        redirectTo: '/',
                        history,
                      });
                    } catch (err) {
                      setMessage(err);
                    }
                  }}
                >
                  <TextInput
                    name="name"
                    label="Collection name:"
                    value={name}
                    onChange={onNameChange}
                  />
                  <FormControl id={name}>
                    <FormLabel>Choose Snippets to add</FormLabel>
                    <Select
                      value={collection}
                      onChange={onCollectionChange}
                    >
                      {allSnippetsData &&
                        allSnippetsData.map((data, i) => (
                          <option
                            key={`${i}-add-option-${data._id}`}
                            value={data._id}
                          >
                            {data.title}
                          </option>
                        ))}
                    </Select>
                  </FormControl>

                  <Button type="submit">Add Collection</Button>
                  <Button onClick={() => setExpandedCollection(0)}>
                    Cancel
                  </Button>
                </form>
                {message && (
                  <div style={{ color: 'tomato' }}>
                    {JSON.stringify(message, null, 2)}
                  </div>
                )}
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </>
    );
  }
);

export default CollectionAction;
