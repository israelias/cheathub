/* eslint-disable no-nested-ternary */
import * as React from 'react';
import {
  RouteComponentProps,
  RouterProps,
} from 'react-router';
import { useQuery } from 'react-query';
import { AddSnippet } from '../components/snippet_crud/add-snippet';
import { EditSnippet } from '../components/snippet_crud/edit-snippet';
// import { DeleteSnippet } from '../components/snippet_crud/delete-snippet';
import { getRequest, putRequest } from '../lib/fetcher';
import { useUserContext } from '../context/user.context';
import { isError } from '../lib/isError';

interface Props
  extends RouteComponentProps<{ id: string }> {}

export const Snippet: React.FC<Props> = ({
  match,
  history,
}) => {
  const user = useUserContext();
  const { isLoading, data, status, error } = useQuery(
    'oneSnippet',
    () =>
      getRequest({
        url: `api/snippets/${match.params.id}`,
        // accessToken: user!.accessToken,
        accessToken:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYxODMxMzI3MCwianRpIjoiNjNmZDc5OGYtMjBiYy00ZjZkLTg1ZmYtODlhZGI5ZTU5MWIxIiwibmJmIjoxNjE4MzEzMjcwLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoiam9lbSIsImV4cCI6MTYxODMyNDA3MH0.0HwJ3u1JCAlpk6obK3wY8hMm3UuB8Rp9Se0q_fLxh0E',
      })
  );

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' && isError(error) ? (
    <p>Error: {error.message}</p>
  ) : (
    <div>
      <div>rendering post {match.params.id}</div>
      {/* <AddSnippet /> */}
      <EditSnippet
        snippet={data[0]}
        snippetId={match.params.id}
      />
      {/* <DeleteSnippet snippet={snippet} /> */}
    </div>
  );
};
