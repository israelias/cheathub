import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import { useQuery } from 'react-query';

import { useUserContext } from '../context/user.context';
import { getRequest } from '../lib/fetcher';
import { checkStatus } from '../lib/isError';

import { EditSnippet } from '../components/snippet_crud/edit-snippet';

interface Props extends RouteComponentProps<{ id: string }> {}

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
export const Snippet: React.FC<Props> = ({ match, history }) => {
  const { accessToken } = useUserContext();
  const { isLoading, data, status, error } = useQuery(
    'oneSnippet',
    () =>
      getRequest({
        url: `api/snippets/${match.params.id}`,
        accessToken,
        // accessToken:
        //   'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxODMxMzI3MCwianRpIjoiNjNmZDc5OGYtMjBiYy00ZjZkLTg1ZmYtODlhZGI5ZTU5MWIxIiwibmJmIjoxNjE4MzEzMjcwLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiam9lbSIsImV4cCI6MTYxODMyNDA3MH0.0HwJ3u1JCAlpk6obK3wY8hMm3UuB8Rp9Se0q_fLxh0E',
      })
  );
  const fetching = checkStatus(status, error);

  return (
    <>
      {fetching ? (
        <p>{fetching}</p>
      ) : (
        <>
          <div>rendering post {match.params.id}</div>

          <EditSnippet
            snippet={data[0]}
            snippetId={match.params.id}
          />
        </>
      )}
    </>
  );
};
