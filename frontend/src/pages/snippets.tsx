/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  useQuery,
  UseQueryResult,
  useInfiniteQuery,
  useQueryClient,
} from 'react-query';
import axios from 'axios';

// import { SnippetFeed } from '../components/snippet-feed';
import { Primary } from '../containers/primary.container';
import { Secondary } from '../containers/secondary.container';
import { Content } from '../connectors/main';
import { SideNav } from '../connectors/side';

import SnippetFeed from '../components/feed';
import SearchBar from '../components/searchbar';

import { getRequest } from '../lib/fetcher';
import {
  fetchSnippets,
  useSnippetsInfinite,
  searchSnippets,
  setInitialData,
} from '../lib/axios';
import { getSnippets } from '../services/get.service';
import { useUserContext } from '../context/user.context';
import { checkStatus } from '../lib/isError';

import useIntersectionObserver from '../lib/useIntersect';

import { TAGS } from '../constants/tags.constants';
import { queryClient } from '../context/query.context';

interface SnippetProps {
  allSnippets: Snippet[];
}

export const Snippets: React.FC<SnippetProps> = ({ allSnippets }) => {
  const { username, accessToken } = useUserContext();

  const queryClient = useQueryClient();

  const [searchText, setSearchText] = React.useState<string>('');
  const [language, setLanguage] = React.useState<string>('');
  const [tags, setTags] = React.useState<string>('');
  const [page, setPage] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [allTagOptions, setAllTagOptions] = React.useState(TAGS);

  const resetAll = () => {
    setSearchText('');
    setLanguage('');
    setTags('');
  };

  const {
    isLoading: queryLoading,
    data: queryData,
    status: queryStatus,
    error: queryError,
    isFetching,
    isPreviousData,
  } = useQuery(
    ['loadSnippets', searchText, language, tags, page],
    () =>
      searchSnippets({
        searchText,
        language,
        tags,
        page,
      }),
    {
      keepPreviousData: true,
      staleTime: 50000,
    }
  );
  const onSearchTextChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { value },
    } = e;
    try {
      if (value === '') {
        setSearchText('');
      }
      setSearchText(value);
      await queryClient.fetchQuery(['loadSnippets', searchText], () =>
        searchSnippets({
          searchText: value,
          language,
          tags,
          page,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  const onLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const {
      target: { value },
    } = event;
    if (value === '') {
      setLanguage('');
    }
    setLanguage(value);
    queryClient.fetchQuery(['loadSnippets', language], () =>
      searchSnippets({
        searchText,
        language: value,
        tags,
        page,
      })
    );
  };
  const onTagChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const {
      target: { value },
    } = event;
    if (value === '') {
      setTags('');
    }
    setTags(value);
    queryClient.fetchQuery(['loadSnippets', tags], () =>
      searchSnippets({
        searchText,
        language,
        tags: value,
        page,
      })
    );
  };
  const onTagParamChange = (value: string) => {
    setTags(value);
  };

  if (queryStatus === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Secondary>gegegegeg</Secondary>
      <Content>
        <SearchBar
          searchText={searchText}
          language={language}
          tags={tags}
          onSearchTextChange={onSearchTextChange}
          onLanguageChange={onLanguageChange}
          onTagsChange={onTagChange}
          allTagOptions={allTagOptions}
          setAllTagOptions={() => setAllTagOptions}
        />

        <SnippetFeed
          snippets={queryData?.items}
          loading={loading}
          setTags={setTags}
        />
      </Content>
    </>
  );
};
