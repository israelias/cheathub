import * as React from 'react';
import { RouteComponentProps } from "react-router";
import { LoggedinHeader } from '../components/shared/header'
import { SearchUser } from '../components/profile_crud/profile-search-snippet'
import { ProfileOwnSnippets } from '../components/profile_crud/profile-own-snippet'
import { getRequest, signUpRequest } from "../lib/fetcher";
import { useUserContext } from '../context/user.context';

interface profileProps extends RouteComponentProps<{id: string}> {
  snippets: Snippet[];
}

export const Profile: React.FC<profileProps> = ({
  snippets,
  history,
  match
}) => {
  const user = useUserContext();
  // const response = getRequest({
  //   url: `api/snippets`,
  //   accessToken: user!.accessToken,
  // }).then(data => setData(data))
  const [data, setData] = React.useState([])
  React.useEffect(() => {
    getRequest({
      url: `api/snippets`,
      accessToken: user!.accessToken,
    }).then(data => setData(data))
    // fetch(`api.example.com/posts/${match.params.id}`)
  }, [])
    return (
      <div>
        <LoggedinHeader
          loggedIn={true}
          username={match.params.id}
          />
        <SearchUser />
        <ProfileOwnSnippets snippets={data} />

      </div>
    );
}