import React from 'react';
import { AxiosResponse } from 'axios';
import {
  getCollectionsProfile,
  getSnippetsProfile,
  getFaveSnippets,
} from '../services/get.service';
import { useUserContext } from './user.context';

interface CollectionsResponse extends AxiosResponse<Collection[]> {}
interface SnippetsResponse extends AxiosResponse<Snippet[]> {}

type ProfileDataType = {
  collectionsProfile: CollectionsResponse | undefined;
  setCollectionsProfile: (
    collectionsProfile: CollectionsResponse
  ) => void;
  snippetsProfile: SnippetsResponse | undefined;
  setSnippetsProfile: (snippetsProfile: SnippetsResponse) => void;
  loadingCollections: boolean;
  setLoadingCollections: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  loadingSnippets: boolean;
  setLoadingSnippets: React.Dispatch<React.SetStateAction<boolean>>;
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
  const { username } = useUserContext();

  const [snippetsProfile, setSnippetsProfile] = React.useState<
    SnippetsResponse | undefined
  >(undefined);

  const [collectionsProfile, setCollectionsProfile] = React.useState<
    CollectionsResponse | undefined
  >(undefined);

  const [
    loadingCollections,
    setLoadingCollections,
  ] = React.useState<boolean>(false);
  const [
    loadingSnippets,
    setLoadingSnippets,
  ] = React.useState<boolean>(false);

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
    setLoadingSnippets(true);
    const response = await getFaveSnippets(username);
    if (response) {
      setSnippetsProfile(response);
      setLoadingSnippets(false);
    }
  };

  React.useEffect(() => {
    if (username) {
      loadCollectionsData();
      loadSnippetsData();
    }
  }, [username]);

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
      }}
    >
      {children}
    </ProfileData.Provider>
  );
}

export const useProfileData = () => React.useContext(ProfileData);
