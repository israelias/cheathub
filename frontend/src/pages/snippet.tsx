/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';

import { RouteComponentProps } from 'react-router';

import {
  Flex,
  Heading,
  IconButton,
  Button,
  ButtonGroup,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Box,
  HStack,
  useMediaQuery,
  GridItem,
  useToast,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useBoolean,
  Tooltip,
  useClipboard,
  VStack,
} from '@chakra-ui/react';

import {
  CheckIcon,
  InfoIcon,
  WarningIcon,
  CopyIcon,
  AddIcon,
  CloseIcon,
  LinkIcon,
  EditIcon,
  MinusIcon,
} from '@chakra-ui/icons';

import { AnimatePresence, motion } from 'framer-motion';
import SnippetCard from '../components/snippet/card';
import SnippetCrud from '../components/snippet/crud';
import { DeleteModal } from '../components/modals/delete-snippet';
import { Prompt } from '../components/modals/toast-feedback';

import {
  putRequest,
  getRequest,
  postRequest,
  deleteRequest,
  putReload,
  postReload,
  likeRequest,
} from '../lib/fetcher';

import { useUserContext } from '../context/user.context';
import { useDataHandler } from '../context/datahandler.context';

import { Secondary } from '../containers/secondary.container';
import { Content } from '../connectors/main';
import { SideNav } from '../connectors/side';
import { HeaderBox } from '../components/shared/header-box';

import {
  MotionSection,
  MotionHeader,
  MotionBox,
  MotionFooter,
  MotionAside,
  MotionUl,
  MotionLi,
  MotionP,
} from '../components/shared/motion-box';

interface SnippetPageProps
  extends RouteComponentProps<{ id: string }> {}

/**
 * Frontend private endpoint that represents a single code snippet post.
 * Selected by `_id`.
 * CRUD operations begin from this component tree.
 * @file defines route for one unique Snippet.
 * @date 2021-04-21
 * @param {any} match
 * @param {any} history
 * @return {=>}
 */
const Snippet: React.FC<SnippetPageProps> = ({ match, history }) => {
  const {
    title,
    setTitle,
    value,
    setValue,
    description,
    setDescription,
    language,
    setLanguage,
    tags,
    setTags,
    source,
    setSource,
    privatize,
    setPrivatize,
    id,
    setId,
    editing,
    setEditing,
    submitting,
    setSubmitting,
    deleting,
    setDeleting,
    alert,
    setAlert,
    heading,
    setHeading,
    clearValues,
    handleDelete,
    handleCancel,
    handleSubmit,
  } = useDataHandler();
  const { accessToken, username } = useUserContext();
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const toast = useToast();
  // const editing = match.params.id !== 'add';

  React.useEffect(() => {
    if (match.params.id !== 'add') {
      setEditing(true);
    } else {
      setEditing(false);
    }
  }, [match.params.id]);

  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const closeAlert = () => setAlert(false);

  const [snippet, setSnippet] = React.useState<Snippet | undefined>();
  const [loading, setLoading] = React.useState(false);

  const [message, setMessage] = React.useState('');

  const [faveSnippet, setFaveSnippet] = useBoolean();

  const getSnippet = async (snippetId: string) => {
    setLoading(true);
    const data = await getRequest({
      url: `api/snippets/${snippetId}`,
      accessToken,
    });
    if (data) {
      setSnippet(data[0]);
      setLoading(false);
    }
  };

  const handleFave = async (snipId: string) => {
    try {
      await likeRequest({
        url: `api/likesnippet/${snipId}`,
        accessToken,
        body: { fave: id },
      })
        .then((res) => res.ok && res.json())
        .then((data) => {
          if (data) {
            setFaveSnippet.toggle();
            setTimeout(() => {
              toast({
                duration: 2500,
                isClosable: true,
                render: () => <Prompt message={data?.message} />,
              });
            }, 100);
          }
        });
    } catch (err) {
      setHeading(err.message);
    }
  };

  React.useEffect(() => {
    if (snippet) {
      setId(snippet._id);
      setHeading(`Editing ${snippet.title}`);
      setTitle(snippet.title);
      setValue(snippet.value);
      setDescription(snippet.description);
      setLanguage(snippet.language);
      setTags(snippet.tags.join(', '));
      snippet.source && setSource(snippet.source);
    }
  }, [snippet]);

  React.useEffect(() => {
    if (match.params.id !== 'add') {
      getSnippet(match.params.id);
    } else {
      clearValues();
    }
  }, [match.params.id]);

  return (
    <>
      <Secondary>
        <HeaderBox left heading={id} />
        <SideNav>
          <SnippetCrud
            snippet={snippet}
            editing={editing}
            setAlert={setAlert}
            title={title}
            setTitle={setTitle}
            language={language}
            setLanguage={setLanguage}
            value={value}
            setValue={setValue}
            description={description}
            setDescription={setDescription}
            tags={tags}
            setTags={setTags}
            source={source}
            setSource={setSource}
            submitting={submitting}
            deleting={deleting}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
            message={message}
          />
        </SideNav>
      </Secondary>
      <DeleteModal alert={alert} setAlert={setAlert} title={title} />
      <Content>
        <HeaderBox heading={heading}>
          {baseLg ? 'true' : 'false'}
          <Button
            onClick={() => {
              // getSnippet();
            }}
          >
            All
          </Button>
        </HeaderBox>
        {!baseLg && (
          <SnippetCrud
            snippet={snippet}
            editing={editing}
            setAlert={setAlert}
            title={title}
            setTitle={setTitle}
            language={language}
            setLanguage={setLanguage}
            value={value}
            setValue={setValue}
            description={description}
            setDescription={setDescription}
            tags={tags}
            setTags={setTags}
            source={source}
            setSource={setSource}
            submitting={submitting}
            deleting={deleting}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
            message={message}
          />
        )}
        {loading ? (
          <p>Loading..</p>
        ) : (
          <SnippetCard
            editing={editing}
            snippet={snippet}
            loading={loading}
            title={title}
            language={language}
            value={value}
            description={description}
            tags={tags}
            source={source}
            id={id}
            setTags={setTags}
            handleFave={handleFave}
            faveSnippet={faveSnippet}
            setFaveSnippet={setFaveSnippet}
          />
        )}
      </Content>
    </>
  );
};

export default Snippet;
