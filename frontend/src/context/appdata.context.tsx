import React from 'react';
import { AxiosResponse } from 'axios';

import {
  getInitialData,
  getResultsData,
  getAllTags,
} from '../services/get.service';

/**
 * Second-level Context provider for all initial snippets and collections data.
 * Responsible for reloading the cache after any local mutations.
 *
 * @since 2021-04-04
 */
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
  onSearchTextChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  onLanguageChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  tags: string;
  setTags: React.Dispatch<React.SetStateAction<string>>;
  onTagChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
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

  const onSearchTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLanguage('');
    setTags('');
    setPage(1);
    const {
      target: { value },
    } = e;
    if (value === '') {
      setSearchText('');
    }
    setSearchText(value);
  };

  const onLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchText('');
    setTags('');
    setPage(1);
    const {
      target: { value },
    } = event;
    if (value === '') {
      setLanguage('');
    }
    setLanguage(value);
  };

  const onTagChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchText('');
    setLanguage('');
    setPage(1);
    const {
      target: { value },
    } = event;
    if (value === '') {
      setTags('');
    }
    setTags(value);
  };

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
        onSearchTextChange,
        language,
        setLanguage,
        onLanguageChange,
        tags,
        setTags,
        onTagChange,
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
