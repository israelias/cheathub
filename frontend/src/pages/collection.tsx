import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  Box,
  Flex,
  Text,
  useMediaQuery,
  useColorModeValue as mode,
} from '@chakra-ui/react';

import { getRequest } from '../services/crud.service';

import { useUserContext } from '../context/user.context';
import { useProfileData } from '../context/profiledata.context';
import { useCollectionHandler } from '../context/collectionhandler';

import { DeleteModal } from '../components/modals/delete-modal';

import { GoBackButton } from '../components/shared/brand-button';

import Page from '../containers/default.container';

import SnippetItem from '../components/collections/snippets';
import CollectionCrud from '../components/collections/crud';

interface CollectionsProps
  extends RouteComponentProps<{ id: string }> {}

/**
 * Frontend public endpoint that represents an array of snippets from an HTTP get request.
 *
 * @file defines Explore page route
 * @since 2021-04-08
 * @param {any} match
 * @param {any}
 * @return {=>}
 */
const Collection: React.FC<CollectionsProps> = ({ match }) => {
  const { snippetsProfile, snippetsOptions } = useProfileData();

  const {
    selectedId,
    setSelectedId,
    setId,
    id,
    name,
    setName,
    snippets,
    setSnippets,
    editing,
    setEditing,
    deleting,
    submitting,
    alert,
    setAlert,
    handleSubmit,
    handleDelete,
    handleCancel,
    clearValues,
  } = useCollectionHandler();

  const { accessToken } = useUserContext();
  const [baseLg] = useMediaQuery('(min-width: 62em)');
  const [heading, setHeading] = React.useState<string>(
    'All Snippets'
  );
  const [collection, setCollection] = React.useState<
    Collection | undefined
  >();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [expanded, setExpanded] = React.useState<number>(0);

  const loadCollection = async (collectionId: string) => {
    setLoading(true);
    const data = await getRequest({
      url: `api/collections/${collectionId}`,
      accessToken,
    });
    if (data) {
      setCollection(data[0]);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (match.params.id !== 'add') {
      setEditing(true);
      loadCollection(match.params.id);
      setId(match.params.id);
      setSnippets([{ label: '', value: '' }]);
    } else {
      setEditing(false);
      clearValues();
    }
  }, [match.params.id]);

  React.useEffect(() => {
    if (collection) {
      setId(collection._id);
      setHeading(`Editing ${collection.name}`);
      setName(collection.name);
      collection.snippets_id && setSnippets(collection.snippets_id);
    } else {
      // setSnippets(snippetsOptions);
      setSnippets([{ label: '', value: '' }]);
    }
  }, [collection]);

  const secondary = loading ? (
    <p>Loading Collection...</p>
  ) : (
    <CollectionCrud
      name={name}
      setName={setName}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      handleCancel={handleCancel}
      setAlert={setAlert}
      editing={editing}
      deleting={deleting}
      submitting={submitting}
      snippets={snippets}
      setSnippets={setSnippets}
    />
  );
  const secondaryHeading = editing
    ? 'Edit Collection'
    : 'New Collection';

  const secondaryFooterHeading = name;
  const secondaryFooterSubheading = id;
  const primary = snippets.map((snip) =>
    snippetsProfile?.data?.map(
      (snippet: Snippet, index: number) =>
        snip.value === snippet._id && (
          <SnippetItem
            key={`col-edit-${snippet._id}-${index}`}
            index={index}
            snippet={snippet}
            selectedSnippetId={selectedId}
            setSelectedSnippetId={setSelectedId}
            expandedSnippet={expanded}
            setExpandedSnippet={setExpanded}
          />
        )
    )
  );
  const primaryHeading =
    editing && collection
      ? `Editing ${collection.name}`
      : 'New Collection';
  const primaryChildren = <GoBackButton>Go Back</GoBackButton>;
  const modals = (
    <DeleteModal
      collection
      title={name}
      alert={alert}
      setAlert={setAlert}
    />
  );
  return (
    <>
      <Page
        secondary={secondary}
        secondaryHeading={secondaryHeading}
        secondaryFooterHeading={secondaryFooterHeading}
        secondaryFooterSubheading={secondaryFooterSubheading}
        primary={baseLg && primary}
        primaryHeading={primaryHeading}
        primaryChildren={primaryChildren}
        modals={modals}
      />
    </>
  );
};

export default Collection;
