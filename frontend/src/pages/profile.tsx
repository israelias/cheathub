import * as React from 'react'
import { LoggedinHeader } from '../components/shared/header'
import { SearchUser } from '../components/profile_crud/profile-search-snippet'
import { ProfileOwnSnippets } from '../components/profile_crud/profile-own-snippet'

interface profileProps {
  snippets: Snippet[];
}

export const Profile: React.FC<profileProps> = ({ snippets }) => {
    return (
      <div>
        <LoggedinHeader loggedIn={true} username="joem"/>
        <SearchUser />
        <ProfileOwnSnippets snippets={snippets} />

      </div>
    );
}