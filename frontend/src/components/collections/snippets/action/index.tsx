/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Button,
  Select as BasicSelect,
  Box,
  Text,
  useOutsideClick,
  Switch,
  HStack,
  ButtonGroup,
} from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { AnimatePresence } from 'framer-motion';
import cn from 'classnames';

import Select, {
  OptionTypeBase,
  ActionMeta,
  Props as SelectProps,
} from 'react-select';

import CreatableSelect, {
  makeCreatableSelect,
} from 'react-select/creatable';

import { SelectInput } from '../../../snippet/crud/select-input';
import { TextInput } from '../../../snippet/crud/text-search-input';
import { StyledLabel } from '../../../snippet/crud/form-label';
import {
  putRequest,
  getRequest,
  postRequest,
} from '../../../../lib/fetcher';
import { LANGUAGES } from '../../../../constants/languages.constants';
import { CardBody } from '../../card-body';

import { MotionBox } from '../../../shared/motion-box';
import { useUserContext } from '../../../../context/user.context';

import '../../styles.css';

interface SnippetActionProps extends RouteComponentProps {
  selectedSnippet: Snippet | undefined;
  selectedId: string | '';
  setSelectedId: React.Dispatch<React.SetStateAction<string | ''>>;
  collectionId?: string;
  j?: number;
  id: string;
  allSnippetsData: Snippet[];
  expandedSnippet: number;
  setExpandedSnippet: React.Dispatch<React.SetStateAction<number>>;
  setCollectionId?: React.Dispatch<React.SetStateAction<string>>;
  snippetActionRef: React.RefObject<HTMLInputElement>;
  setEditingSnippet: React.Dispatch<React.SetStateAction<boolean>>;
}

const SnippetAction = withRouter(
  ({
    history,
    selectedSnippet,
    selectedId,
    setSelectedId,
    id,
    allSnippetsData,
    expandedSnippet,
    setExpandedSnippet,
    snippetActionRef,
    setEditingSnippet,
  }: SnippetActionProps) => {
    const API = 'http://localhost5000/api';

    const { accessToken } = useUserContext();
    const languages = [{ value: '', label: 'All' }, ...LANGUAGES];
    const [message, setMessage] = React.useState(null);

    const [title, setTitle] = React.useState('Your Title');
    const [codeValue, setCodeValue] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [language, setLanguage] = React.useState('');

    const [tags, setTags] = React.useState<OptionTypeBase[]>([]);
    const tagOptions = [
      { label: 'apple', value: 'apple' },
      { label: 'orange', value: 'orange' },
    ];
    const [collection, setCollection] = React.useState<string>('');
    const [snippetId, setSnippetId] = React.useState<string>('');

    const [editing, setEditing] = React.useState<boolean>(false);

    // const [selectedId, setSelectedId] = React.useState('');
    const isOpen = expandedSnippet === -1;

    const className = cn('accordion', {
      'accordion--open': isOpen,
      'accordion--next-to-open': expandedSnippet - 1 || false,
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

    const onLanguageChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const {
        target: { value },
      } = event;
      if (value === '') {
        setDescription('');
      }
      setDescription(value);
    };

    const onTitleChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const {
        target: { value },
      } = event;
      if (value === '') {
        setTitle('');
      }
      setTitle(value);
    };

    const onDescriptionChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const {
        target: { value },
      } = event;
      if (value === '') {
        setDescription('');
      }
      setDescription(value);
    };

    const onCodeValueChange = (
      event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const {
        target: { value },
      } = event;
      if (value === '') {
        setCodeValue('');
      }
      setCodeValue(value);
    };
    const onTagsChange = (newValue: any, actionMeta: any) => {
      console.group('value changed');
      console.log('newvalue', newValue);
      console.log('action', actionMeta.action);
      console.groupEnd();
    };

    const handleSubmit = async (
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();
      if (!editing) {
        try {
          await postRequest({
            url: `api/snippets/${id}`,
            accessToken,

            body: {
              title,
              description,
              value: codeValue,
              language,
              // tags: tags.split(';'),
              // collection: [collection],
            },
            redirectTo: '/',
            history,
          });
        } catch (err) {
          setMessage(err);
        }
      } else {
        try {
          await putRequest({
            url: `api/snippets/${id}`,
            accessToken,
            body: {
              title,
              description,
              value: codeValue,
              language,
              // tags: tags.split(';'),
            },
            redirectTo: '/',
            history,
          });
        } catch (err) {
          setMessage(err);
        }
        setEditing(false);
        setSelectedId('');
      }
      setTitle('');
      setDescription('');
      setCodeValue('');
    };

    // const get

    const getSnippets = async () => {
      const res = await fetch(`${API}/users`);
      const data = await res.json();
      // setSni(data);
      // console.log(data);
    };

    const editSnippet = async (selectedSnippetId: string) => {
      const res = await fetch(`${API}/users/${id}`);
      const data = await res.json();

      setEditing(true);

      setSelectedId(selectedSnippetId);

      setTitle(data.title);
      setDescription(data.description);
      setCodeValue(data.value);
      setLanguage(data.language);
      // setTags(data.tags.join(', '));
      // nameInput.current.focus();
    };

    const deleteSnippet = async (selectedSnippetId: string) => {
      const userResponse = window.confirm(
        'Are you sure you want to delete it?'
      );
      if (userResponse) {
        const res = await fetch(`${API}/users/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        // await getUsers();
      }
    };

    const snippetItemRef = React.useRef<HTMLDivElement>(null);

    useOutsideClick({
      ref: snippetItemRef,
      handler: () => setEditingSnippet(false),
    });

    React.useEffect(() => {
      if (selectedSnippet) {
        setTitle(selectedSnippet.title);
        setDescription(selectedSnippet.description);
        setCodeValue(selectedSnippet.value);
        setLanguage(selectedSnippet.language);
        // setTags(selectedSnippet.tags.join(', '));
      }
    }, [selectedSnippet]);

    React.useEffect(() => {
      if (!isOpen) {
        setTitle('');
        setDescription('');
        setCodeValue('');
        setLanguage('');
        // setTags('');
      }
    }, [isOpen]);

    return (
      <>
        <Box ref={snippetItemRef} className={className}>
          <header onClick={() => setExpandedSnippet(-1)}>
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
                <CardBody
                  description={description}
                  codeId={snippetId}
                  codeValue={codeValue}
                  codeLanguage={language}
                />
                <Box>
                  <form id="snippet" onSubmit={handleSubmit}>
                    <Box pb="10px">
                      <FormControl id="title">
                        <StyledLabel label="Title" />
                        <Input
                          ref={snippetActionRef}
                          type="text"
                          borderColor="#f6f6f6"
                          variant="flushed"
                          height="50px"
                          padding={['0 10px']}
                          value={title}
                          onChange={onTitleChange}
                        />
                        <FormHelperText hidden>Title.</FormHelperText>
                      </FormControl>

                      <FormControl id="body">
                        <StyledLabel label="Code Snippet" />

                        <Textarea
                          value={codeValue}
                          onChange={onCodeValueChange}
                        />
                      </FormControl>

                      <FormControl
                        pt="10px"
                        isRequired
                        id="description"
                      >
                        <StyledLabel label="Description" />
                        <Input
                          mt="10px"
                          borderColor="#f6f6f6"
                          fontSize="sm"
                          value={description}
                          onChange={onDescriptionChange}
                        />
                      </FormControl>

                      <SelectInput
                        label="Language:"
                        options={languages}
                        value={language}
                        onChange={() => onLanguageChange}
                      />
                      <CreatableSelect
                        multi
                        options={tagOptions}
                        // value={tags}
                        onChange={onTagsChange}
                      />

                      <FormControl pt="10px" id="source">
                        <StyledLabel label="Source" />
                        <Input
                          mt="10px"
                          type="text"
                          size="sm"
                          borderColor="#f6f6f6"
                          value="source"
                          placeholder="https://"
                          onChange={() => {}}
                        />
                        <FormHelperText hidden>
                          Add a URL source?
                        </FormHelperText>
                      </FormControl>

                      <FormControl
                        // justifyContent="space-between"
                        pt="10px"
                        display="flex"
                        alignItems="center"
                      >
                        <FormLabel
                          p={['0 10px']}
                          m={0}
                          bg="#f6f6f6"
                          borderRadius="md"
                          color="gray.700"
                          fontWeight="light"
                          size="sm"
                          fontSize="sm"
                          htmlFor="private"
                          mb="0"
                        >
                          Make private
                        </FormLabel>
                        <Switch ml="10px" size="sm" id="private" />
                        <FormHelperText hidden>
                          Snippets are public by default
                        </FormHelperText>
                      </FormControl>
                    </Box>
                  </form>
                  <HStack>
                    <form
                      id="delete"
                      // onSubmit={handleDelete}
                    >
                      <Button
                        type="button"
                        // isLoading={deleting}
                        loadingText="Deleting"
                        // onClick={() => setAlert(true)}
                      >
                        Delete
                      </Button>
                    </form>
                    <ButtonGroup
                      variant="outline"
                      spacing="8"
                      alignSelf="center"
                      padding={['20px 10px']}
                    >
                      <Button
                        ml="12px"
                        type="button"
                        // onClick={handleCancel}
                        onClick={() => {
                          setTitle('');
                          setDescription('');
                          setCodeValue('');
                          setLanguage('');
                          // setTags('');
                          setExpandedSnippet(0);
                          setEditingSnippet(false);
                        }}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        form="snippet"
                        // isLoading={submitting}
                        loadingText="Submitting"
                      >
                        {selectedSnippet ? 'Update' : 'Add'}
                      </Button>
                    </ButtonGroup>
                  </HStack>
                  {message && (
                    <div style={{ color: 'tomato' }}>
                      {JSON.stringify(message, null, 2)}
                    </div>
                  )}
                </Box>
              </MotionBox>
            )}
          </AnimatePresence>
        </Box>
      </>
    );
  }
);

export default SnippetAction;
