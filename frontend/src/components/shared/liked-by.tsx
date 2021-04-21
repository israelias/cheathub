import React from 'react';
import { ToUserButton } from '../../reference/special-button';

type Username = string;

interface Props {
  usernames: Username[];
  setUsernameId: () => void;
}

export const Likes: React.FC<Props> = ({
  usernames,
  setUsernameId,
}) => (
  <section id="liked-by">
    <p>
      {usernames.map((username) => (
        <ToUserButton
          setUsernameId={setUsernameId}
          key={username}
          user={username}
          label={username}
        />
      ))}
    </p>
  </section>
);
