import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { LoggedinHeader } from '../components/shared/header';
import { SearchUser } from '../components/profile_crud/profile-search-snippet';
import { ProfileOwnSnippets } from '../components/profile_crud/profile-own-snippet';
import { getRequest, signUpRequest } from '../lib/fetcher';
import { useUserContext } from '../context/user.context';
import { CollectionList } from '../components/layout/accordion';
import { useQuery, useMutation, useQueryClient } from 'react-query';

interface profileProps extends RouteComponentProps<{ id: string }> {
  snippets: Snippet[];
}

export const Profile: React.FC<profileProps> = ({
  snippets,
  history,
  match,
}) => {
  const user = useUserContext();
  const { isLoading, error, data } = useQuery('myCollections', () =>
    getRequest({
      url: `api/users/noah/collections`,
      accessToken: user!.accessToken,
    })
  );
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <LoggedinHeader loggedIn={true} username={match.params.id} />
      <CollectionList data={data} />
      <SearchUser />
      {/* <ProfileOwnSnippets snippets={data} /> */}
    </div>
  );
};
