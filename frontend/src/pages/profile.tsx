import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  useQuery,
  // useMutation,
  // useQueryClient,
} from 'react-query';
import { LoggedinHeader } from '../components/shared/header';
// import { SearchUser } from '../components/profile_crud/profile-search-snippet'
// import { ProfileOwnSnippets } from '../components/profile_crud/profile-own-snippet';
import { getRequest } from '../lib/fetcher';
import { useUserContext } from '../context/user.context';
import { CollectionList } from '../components/layout/accordion';

interface ProfileProps
  extends RouteComponentProps<{ id: string }> {
  snippets: Snippet[];
}

export const Profile: React.FC<ProfileProps> = ({
  snippets,
  history,
  match,
}) => {
  const user = useUserContext();
  // add error
  const { isLoading, data } = useQuery(
    'myCollections',
    () =>
      getRequest({
        url: `api/users/noah/collections`,
        accessToken: user!.accessToken,
      })
  );
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <LoggedinHeader
        loggedIn={true}
        username={match.params.id}
      />
      <CollectionList data={data} />
      {/* <SearchUser /> */}
      {/* <ProfileOwnSnippets snippets={data} /> */}
    </div>
  );
};
