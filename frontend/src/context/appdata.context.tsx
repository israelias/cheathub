import React from 'react';
import { AxiosResponse } from 'axios';
import { SelectProps } from '@chakra-ui/react';
import {
  getInitialData,
  getResultsData,
  getAllTags,
} from '../services/get.service';

interface Response extends AxiosResponse {
  links: {
    self: string;
    first: string;
    last: string;
  };
  has_prev: boolean;
  has_next: boolean;
  page: number;
  total_pages: number;
  items_per_page: number;
  total_items: number;
  items: Snippet[];
}

type AppDataType = {
  data: Response | undefined;
  setData: (data: Response) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  tags: string;
  setTags: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setPage: (page: number) => void;
  allTags: Options[];
  setAllTags: (allTags: Options[]) => void;
  loadResultsData: () => Promise<void>;
  loadInitialData: () => Promise<void>;
  loadAllTags: () => Promise<void>;
};
const AppData = React.createContext<AppDataType>(undefined!);

export function AppDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = React.useState<Response | undefined>(
    undefined
  );
  const [searchText, setSearchText] = React.useState<string>('');
  const [language, setLanguage] = React.useState<string>('');
  const [tags, setTags] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [allTags, setAllTags] = React.useState<Options[]>([
    { label: '', value: '' },
  ]);

  const loadResultsData = async () => {
    setLoading(true);
    const response = await getResultsData(
      searchText,
      language,
      tags,
      page
    );

    if (response && response.data) {
      setData(response.data);
      setLoading(false);
    }
  };

  const loadInitialData = async () => {
    setLoading(true);
    const response = await getInitialData();
    if (response && response.data) {
      setData(response.data);
      setLoading(false);
    }
  };

  const loadAllTags = async () => {
    const response = await getAllTags();
    if (response && response.data) {
      setAllTags(response.data);
    }
  };

  React.useEffect(() => {
    loadResultsData();
  }, [searchText, language, tags, page]);

  React.useEffect(() => {
    loadAllTags();
  }, []);

  React.useEffect(() => {
    loadInitialData();
  }, []);

  return (
    <AppData.Provider
      value={{
        loadInitialData,
        loadResultsData,
        loadAllTags,
        data,
        setData,
        searchText,
        setSearchText,
        language,
        setLanguage,
        tags,
        setTags,
        page,
        setPage,
        loading,
        setLoading,
        allTags,
        setAllTags,
      }}
    >
      {children}
    </AppData.Provider>
  );
}

export const useAppData = () => React.useContext(AppData);
