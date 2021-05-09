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

/**
 * Fourth-level Context provider for all CRUD operations.
 * Creating, Editing, Deleting user's own collections and snippets.
 *
 * @since 2021-04-08
 */

type HandlerType = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  tags: string;
  setTags: React.Dispatch<React.SetStateAction<string>>;
  source: string;
  setSource: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  privatize: string;
  setPrivatize: React.Dispatch<React.SetStateAction<string>>;
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  deleting: boolean;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  alert: boolean;
  setAlert: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
  setHeading: React.Dispatch<React.SetStateAction<string>>;
  faveSnippet: boolean;
  setFaveSnippet: {
    readonly on: () => void;
    readonly off: () => void;
    readonly toggle: () => void;
  };
  handleFave: (snipId: string) => Promise<void>;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  handleDelete: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  handleCancel: () => void;
  clearValues: () => void;
};

const DataHandler = React.createContext<HandlerType>(undefined!);

export function DataHandlerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username, accessToken } = useUserContext();
  const { loadInitialData } = useAppData();
  const { loadSnippetsData } = useProfileData();
  const toast = useToast();
  const history = useHistory();
  const [faveSnippet, setFaveSnippet] = useBoolean();

  const [title, setTitle] = React.useState<string>('Your Title');
  const [value, setValue] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [language, setLanguage] = React.useState<string>('');
  const [tags, setTags] = React.useState<string>('');
  const [source, setSource] = React.useState<string>('');
  const [privatize, setPrivatize] = React.useState<string>('');

  const [editing, setEditing] = React.useState<boolean>(false);
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [deleting, setDeleting] = React.useState<boolean>(false);

  const [alert, setAlert] = React.useState(false);

  const [id, setId] = React.useState('');

  const [heading, setHeading] = React.useState<string>('Add New');

  const handleCancel = () => {
    history.goBack();
    clearValues();
  };

  const clearValues = () => {
    setId('');
    setHeading('Add New');
    setTitle('My new code snippet');
    setDescription(`hello from ${username}`);
    setValue('hello world');
    setLanguage('javascript');
    setTags('first post');
    setSource('');
    setPrivatize('');
    setSource('');
    setHeading('Add New');
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSubmitting(true);
    if (!editing) {
      try {
        await postReload({
          url: `api/snippets`,
          accessToken,
          body: {
            title,
            description,
            value,
            language,
            tags: tags.split(', '),
          },
        }).then((response) => {
          if (response.ok) {
            setTimeout(() => {
              toast({
                duration: 3000,
                isClosable: true,
                render: () => <Prompt message="Snippet Added" />,
              });
            }, 750);
            setTimeout(() => {
              setSubmitting(false);
              clearValues();
              loadInitialData();
              loadSnippetsData();
              history.push(`/collections/${username}`);
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
        setHeading(err.message);
      }
    } else {
      try {
        await putReload({
          url: `api/snippets/${id}`,
          accessToken,
          body: {
            title,
            description,
            value,
            language,
            tags: tags.split(', '),
          },
        }).then((response) => {
          if (response.ok) {
            setTimeout(() => {
              toast({
                duration: 3000,
                isClosable: true,
                render: () => <Prompt message="Snippet Updated" />,
              });
            }, 750);
            setTimeout(() => {
              setSubmitting(false);
              clearValues();
              loadInitialData();
              loadSnippetsData();
              history.push('/explore');
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
        setHeading(err.message);
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
        url: `api/snippets/${id}`,
        accessToken,
      }).then((res) => {
        if (res.ok) {
          setTimeout(() => {
            toast({
              duration: 3000,
              isClosable: true,
              render: () => <Prompt message="Snippet Deleted" />,
            });
          }, 750);
          setTimeout(() => {
            setDeleting(false);
            loadInitialData();
            loadSnippetsData();
            history.push('/explore');
          }, 1500);
        }
      });
    } catch (err) {
      setHeading(err.message);
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

  return (
    <DataHandler.Provider
      value={{
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
        submitting,
        setSubmitting,
        deleting,
        setDeleting,
        editing,
        setEditing,
        alert,
        setAlert,
        heading,
        setHeading,
        clearValues,
        faveSnippet,
        setFaveSnippet,
        handleFave,
        handleDelete,
        handleCancel,
        handleSubmit,
      }}
    >
      {children}
    </DataHandler.Provider>
  );
}

export const useDataHandler = () => React.useContext(DataHandler);
