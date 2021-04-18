import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
  useQuery,
  // useMutation,
  // useQueryClient,
} from 'react-query';
import { isError } from '../lib/isError';
import { SideNav } from '../components/layout/side';
// import { LoggedinHeader } from '../components/shared/header';
// import { SearchUser } from '../components/profile_crud/profile-search-snippet'
// import { ProfileOwnSnippets } from '../components/profile_crud/profile-own-snippet';
import { getRequest } from '../lib/fetcher';
import { useUserContext } from '../context/user.context';
import { CollectionList } from '../components/layout/accordion';
import {
  View,
  SideNav as SideBar,
  MainFeed,
  MainHeader,
  Container as MainContainer,
} from '../components/layout/commonCard';

interface ProfileProps extends RouteComponentProps<{ id: string }> {
  snippets: Snippet[];
}

export const Profile: React.FC<ProfileProps> = ({
  snippets,
  history,
  match,
}) => {
  const user = useUserContext();
  // add error
  const { isLoading, data, status, error } = useQuery(
    'myCollections',
    () =>
      getRequest({
        url: `api/users/noah/collections`,
        accessToken: user!.accessToken,
      })
  );
  const {
    data: dataS,
    error: errorS,
    isLoading: isLoadingS,
    status: statusS,
  } = useQuery('mySnippets', () =>
    getRequest({
      url: `api/users/noah/snippets`,
      accessToken: user!.accessToken,
    })
  );
  if (isLoading) return <p>Loading...</p>;

  if (status === 'error') {
    if (isError(error)) {
      return <p>{`An error has occurred: ${error.message}`}</p>;
    }
  }
  if (isLoadingS) return <p>Loading...</p>;
  if (statusS === 'error') {
    if (isError(errorS)) {
      return <p>{`An error has occurred: ${errorS.message}`}</p>;
    }
  }

  return (
    <div>
      {/* <LoggedinHeader
        loggedIn={true}
        username={match.params.id}
      /> */}
      <MainHeader />
      <View>
        <SideNav>
          <CollectionList data={data} />
        </SideNav>
        <MainContainer>
          <MainFeed snippets={dataS} />
        </MainContainer>
        {/* <SearchUser /> */}
        {/* <ProfileOwnSnippets snippets={data} /> */}
      </View>
    </div>
  );
};
