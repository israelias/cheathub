import React from 'react';
import { AxiosResponse } from 'axios';
import {
  getCollectionsProfile,
  getSnippetsProfile,
  getFaveSnippets,
  getCollectionsOptions,
  getSnippetsOptions,
} from '../services/get.service';
import { useUserContext } from './user.context';

/**
 * Third-level Context provider for all user-specific snipetts and collections data.
 * Relies on UserContext's username upon login to fetch user's data.
 *
 * @since 2021-04-08
 */

interface CollectionsResponse extends AxiosResponse<Collection[]> {}
interface SnippetsResponse extends AxiosResponse<Snippet[]> {}

type ProfileDataType = {
  collectionsProfile: CollectionsResponse | undefined;
  setCollectionsProfile: (
    collectionsProfile: CollectionsResponse
  ) => void;
  snippetsProfile: SnippetsResponse | undefined;
  setSnippetsProfile: (snippetsProfile: SnippetsResponse) => void;
  faveSnippets: CollectionsResponse | undefined;
  setFaveSnippets: (faveSnippets: CollectionsResponse) => void;
  loadingCollections: boolean;
  setLoadingCollections: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  loadingSnippets: boolean;
  setLoadingSnippets: React.Dispatch<React.SetStateAction<boolean>>;
  loadingFaves: boolean;
  setLoadingFaves: React.Dispatch<React.SetStateAction<boolean>>;
  snippetsOptions: Options[];
  setSnippetsOptions: (snippetsOptions: Options[]) => void;
  loadSnippetsOptions: () => Promise<void>;
  collectionsOptions: Options[];
  setCollectionsOptions: (collectionsOptions: Options[]) => void;
  loadCollectionsOptions: () => Promise<void>;
  loadSnippetsData: () => Promise<void>;
  loadCollectionsData: () => Promise<void>;
  loadFaveSnippets: () => Promise<void>;
};

const ProfileData = React.createContext<ProfileDataType>(undefined!);

export function ProfileDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { username, loggedIn } = useUserContext();

  const [snippetsProfile, setSnippetsProfile] = React.useState<
    SnippetsResponse | undefined
  >(undefined);

  const [collectionsProfile, setCollectionsProfile] = React.useState<
    CollectionsResponse | undefined
  >(undefined);

  const [faveSnippets, setFaveSnippets] = React.useState<
    CollectionsResponse | undefined
  >(undefined);

  const [snippetsOptions, setSnippetsOptions] = React.useState<
    Options[]
  >([{ label: '', value: '' }]);

  const [collectionsOptions, setCollectionsOptions] = React.useState<
    Options[]
  >([{ label: '', value: '' }]);

  const [
    loadingCollections,
    setLoadingCollections,
  ] = React.useState<boolean>(false);

  const [
    loadingSnippets,
    setLoadingSnippets,
  ] = React.useState<boolean>(false);
  const [loadingFaves, setLoadingFaves] = React.useState<boolean>(
    false
  );

  const loadCollectionsData = async () => {
    setLoadingCollections(true);
    const response = await getCollectionsProfile(username);
    if (response) {
      setCollectionsProfile(response);
      setLoadingCollections(false);
    }
  };

  const loadSnippetsData = async () => {
    setLoadingSnippets(true);
    const response = await getSnippetsProfile(username);
    if (response) {
      setSnippetsProfile(response);
      setLoadingSnippets(false);
    }
  };

  const loadFaveSnippets = async () => {
    setLoadingFaves(true);
    const response = await getFaveSnippets(username);
    if (response) {
      setFaveSnippets(response);
      setLoadingFaves(false);
    }
  };

  const loadSnippetsOptions = async () => {
    const response = await getSnippetsOptions(username);
    if (response && response.data) {
      setSnippetsOptions(response.data);
    }
  };

  const loadCollectionsOptions = async () => {
    const response = await getCollectionsOptions(username);
    if (response && response.data) {
      setCollectionsOptions(response.data);
    }
  };

  React.useEffect(() => {
    if (loggedIn && username) {
      loadCollectionsData();
      loadSnippetsData();
      loadFaveSnippets();
      loadSnippetsOptions();
      loadCollectionsOptions();
    }
  }, [loggedIn, username]);

  return (
    <ProfileData.Provider
      value={{
        loadSnippetsData,
        loadCollectionsData,
        collectionsProfile,
        setCollectionsProfile,
        loadingCollections,
        setLoadingCollections,
        snippetsProfile,
        setSnippetsProfile,
        loadingSnippets,
        setLoadingSnippets,
        loadFaveSnippets,
        setFaveSnippets,
        faveSnippets,
        loadingFaves,
        setLoadingFaves,
        snippetsOptions,
        setSnippetsOptions,
        loadSnippetsOptions,
        collectionsOptions,
        setCollectionsOptions,
        loadCollectionsOptions,
      }}
    >
      {children}
    </ProfileData.Provider>
  );
}

export const useProfileData = () => React.useContext(ProfileData);
