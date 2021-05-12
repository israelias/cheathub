/* eslint-disable no-console */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useToast, useBoolean } from '@chakra-ui/react';

import { Prompt } from '../components/modals/toast-feedback';

import { useUserContext } from './user.context';
import { useAppData } from './appdata.context';
import { useProfileData } from './profiledata.context';

import {
  deleteRequest,
  putReload,
  postReload,
  likeRequest,
} from '../services/crud.service';

type CollectionHandlerType = {
  selected: Snippet | undefined;
  setSelected: React.Dispatch<
    React.SetStateAction<Snippet | undefined>
  >;
  selections: Snippet[] | undefined;
  setSelections: React.Dispatch<
    React.SetStateAction<Snippet[] | undefined>
  >;
  loadingSelected: boolean;
  setLoadingSelected: React.Dispatch<React.SetStateAction<boolean>>;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  snippets: Options[];
  setSnippets: (snippets: Options[]) => void;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  deleting: boolean;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  handleDelete: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
  clearValues: () => void;
};

const CollectionHandler = React.createContext<CollectionHandlerType>(
  undefined!
);

export function CollectionHandlerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username, accessToken } = useUserContext();
  const { loadInitialData } = useAppData();
  const {
    loadSnippetsData,
    loadCollectionsData,
    loadSnippetsOptions,
    loadCollectionsOptions,
  } = useProfileData();

  const toast = useToast();
  const history = useHistory();

  const [selectedId, setSelectedId] = React.useState<string>('');

  const [
    loadingSelected,
    setLoadingSelected,
  ] = React.useState<boolean>(false);

  const [selections, setSelections] = React.useState<
    Snippet[] | undefined
  >(undefined);

  const [selected, setSelected] = React.useState<Snippet | undefined>(
    undefined
  );

  const [id, setId] = React.useState<string>('');
  const [name, setName] = React.useState<string>('Collection Name');
  const [snippets, setSnippets] = React.useState<Options[]>([
    { label: '', value: '' },
  ]);

  const [editing, setEditing] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [deleting, setDeleting] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState<boolean>(false);

  const clearValues = () => {
    setId('');
    setName('Collection Name');
    setSnippets([]);
  };

  const handleCancel = () => {
    history.goBack();
    clearValues();
  };

  console.log(snippets);
  console.log(snippets.map((snip) => snip.value));

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitting(true);
    if (!editing) {
      try {
        console.log(snippets);
        await postReload({
          url: `api/collections`,
          accessToken,
          body: {
            name,
            snippets: snippets.map((snip) => snip.value),
          },
        }).then((response) => {
          if (response.ok) {
            setTimeout(() => {
              toast({
                duration: 3000,
                isClosable: true,
                render: () => <Prompt message="Collection Added" />,
              });
            }, 750);
            setTimeout(() => {
              setSubmitting(false);
              clearValues();
              // loadSnippetsData();
              loadSnippetsOptions();
              loadCollectionsData();
              // loadCollectionsOptions()
              // loadInitialData();
              history.goBack();
              // history.push(`/collections/${username}`);
            }, 1500);
          } else {
            response.json().then((data) => {
              if (data.message) {
                setSubmitting(false);
                toast({
                  duration: 3000,
                  isClosable: true,
                  render: () => (
                    <Prompt warning message={data.message} />
                  ),
                });
              }
            });
          }
        });
      } catch (err) {
        setSubmitting(false);
        toast({
          duration: 3000,
          isClosable: true,
          render: () => <Prompt error message={err.message} />,
        });
      }
    } else {
      try {
        console.log(snippets);
        await putReload({
          url: `api/collections/${id}`,
          accessToken,
          body: {
            name,
            snippets: snippets.map((snip) => snip.value),
          },
        }).then((response) => {
          if (response.ok) {
            setTimeout(() => {
              toast({
                duration: 3000,
                isClosable: true,
                render: () => <Prompt message="Collection Updated" />,
              });
            }, 750);
            setTimeout(() => {
              setSubmitting(false);
              clearValues();
              // loadSnippetsData();
              loadSnippetsOptions();
              loadCollectionsData();
              // loadCollectionsOptions();
              // loadInitialData();
              // history.push('/explore');
              history.goBack();
            }, 1500);
          } else {
            response.json().then((data) => {
              if (data.message) {
                setSubmitting(false);
                toast({
                  duration: 3000,
                  isClosable: true,
                  render: () => (
                    <Prompt warning message={data.message} />
                  ),
                });
              }
            });
          }
        });
      } catch (err) {
        setSubmitting(false);
        toast({
          duration: 3000,
          isClosable: true,
          render: () => <Prompt error message={err.message} />,
        });
      }
    }
  };

  const handleDelete = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setDeleting(true);
    try {
      await deleteRequest({
        url: `api/collections/${id}`,
        accessToken,
      }).then((res) => {
        if (res.ok) {
          setTimeout(() => {
            toast({
              duration: 3000,
              isClosable: true,
              render: () => <Prompt message="Collection Deleted" />,
            });
          }, 750);
          setTimeout(() => {
            setDeleting(false);
            loadCollectionsData();
            history.goBack();
          }, 1500);
        } else {
          res.json().then((data) => {
            if (data.message) {
              setDeleting(false);
              toast({
                duration: 3000,
                isClosable: true,
                render: () => (
                  <Prompt warning message={data.message} />
                ),
              });
            }
          });
        }
      });
    } catch (err) {
      setDeleting(false);
      toast({
        duration: 3000,
        isClosable: true,
        render: () => <Prompt error message={err.message} />,
      });
    }
  };

  return (
    <CollectionHandler.Provider
      value={{
        selected,
        setSelected,
        selections,
        setSelections,

        loadingSelected,
        setLoadingSelected,
        selectedId,
        setSelectedId,
        handleSubmit,
        handleDelete,
        handleCancel,
        id,
        setId,
        name,
        setName,
        snippets,
        setSnippets,
        submitting,
        setSubmitting,
        deleting,
        setDeleting,
        editing,
        setEditing,
        alert,
        setAlert,
        clearValues,
      }}
    >
      {children}
    </CollectionHandler.Provider>
  );
}

export const useCollectionHandler = () =>
  React.useContext(CollectionHandler);
