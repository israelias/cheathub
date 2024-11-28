import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { useMediaQuery, Box } from '@chakra-ui/react';
import SnippetCard from '../components/snippet/card';
import SnippetCrud from '../components/snippet/crud';
import { DeleteModal } from '../components/modals/delete-modal';
import { getRequest } from '../services/crud.service';
import { useDataHandler } from '../context/datahandler.context';
import { useUserContext } from '../context/user.context';
import Page from '../containers/default.container';
import { GoBackButton } from '../components/shared/brand-button';
import LoadSpinner from '../components/shared/spinner';

interface SnippetPageProps extends RouteComponentProps<{ id: string }> {}

const Snippet: React.FC<SnippetPageProps> = ({ match }) => {
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
    deleting,
    alert,
    setAlert,
    heading,
    setHeading,
    clearValues,
    faving,
    faveSnippet,
    handleFave,
    handleDelete,
    handleCancel,
    handleSubmit,
  } = useDataHandler();
  const { accessToken, username } = useUserContext();
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const [snippet, setSnippet] = React.useState<Snippet | undefined>();
  const [loading, setLoading] = React.useState(false);

  const loadSnippet = async (snippetId: string) => {
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

  React.useEffect(() => {
    if (match.params.id !== 'add') {
      setEditing(true);
      loadSnippet(match.params.id);
    } else {
      setEditing(false);
      clearValues();
    }
  }, [match.params.id]);

  React.useEffect(() => {
    if (snippet) {
      setId(snippet._id);
      setHeading(`Editing ${snippet.title}`);
      setTitle(snippet.title);
      setValue(snippet.value);
      setDescription(snippet.description);
      setLanguage(snippet.language);
      setTags(snippet.tags.join(', '));
      setPrivatize(snippet.private === false ? '' : 'On');
      snippet.source && setSource(snippet.source);
    }
  }, [snippet]);

  const snippetProps = {
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
  };

  const editingProps = {
    editing,
    setEditing,
    submitting,
    deleting,
    alert,
    setAlert,
    heading,
    setHeading,
    clearValues,
    faving,
    faveSnippet,
    handleFave,
    handleDelete,
    handleCancel,
    handleSubmit,
  };

  const secondary = (
    <SnippetCrud
      snippet={snippet}
      {...snippetProps}
      {...editingProps}
    />
  );

  const primary = loading ? (
    <Box mt="40vh">
      <LoadSpinner />
    </Box>
  ) : (
    <SnippetCard
      snippet={snippet}
      loading={loading}
      editing={editing}
      {...snippetProps}
      faving={faving}
      handleFave={handleFave}
      faveSnippet={faveSnippet}
    />
  );

  const modals = (
    <DeleteModal
      snippet
      title={title}
      alert={alert}
      setAlert={setAlert}
    />
  );

  const secondaryHeading = heading;
  const primaryHeading = heading;
  const primaryChildren = <GoBackButton>Go Back</GoBackButton>;

  return (
    <>
      <Page
        secondary={secondary}
        secondaryHeading={secondaryHeading}
        primary={baseLg && primary}
        primaryHeading={primaryHeading}
        primaryChildren={primaryChildren}
        modals={modals}
      />
    </>
  );
};

export default Snippet;